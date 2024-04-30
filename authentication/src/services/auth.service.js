// NPM Modules
import jwt from 'jsonwebtoken';
import axios from 'axios';
import _ from 'lodash';

// Local Modules
import { AuthModel } from '../models';
import { ErrorsUtil, CryptoUtil, Generator } from '../utils';
import RedisMethods from '../redis/redis.model';
import config from '../config/variables.config';

const { AUTH, VERIFICATION_CODE, SEND_NOTIFICATION_URL } = config;
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_ACTIVE_TIME } = AUTH;
const {
  InputValidationError, UnauthorizedError, PermissionError, ConflictError, ResourceNotFoundError
} = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const access_token = jwt.sign(payload, JWT_ACCESS_SECRET);
    const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET);

    return { access_token, refresh_token };
  }

  static generateAccessToken(payload) {
    return {
      access_token: jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_ACTIVE_TIME })
    };
  }

  static genAccessTokenForActivationCode(payload) {
    return {
      access_token: jwt.sign(payload, VERIFICATION_CODE.ACCESS_SECRET, {
        expiresIn: VERIFICATION_CODE.ACTIVE_TIME
      })
    };
  }

  static validateAccessToken(access_token) {
    try {
      return jwt.verify(access_token, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static validateAccessTokenForRegistration(access_token) {
    try {
      return jwt.verify(access_token, VERIFICATION_CODE.ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static async validateRefreshToken(refresh_token) {
    try {
      return jwt.verify(refresh_token, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static async refresh(token) {
    const user = await AuthService.validateRefreshToken(token);
    const updatedUser = await AuthModel.findByUsername(user.username);
    if (updatedUser.status === 'passive') {
      throw new PermissionError('Passive account');
    }
    const { access_token, refresh_token } = AuthService.generateTokens(user);

    return {
      access_token,
      refresh_token,
      ...user
    };
  }

  static async signUp(payload) {
    try {
      payload.user_name = payload?.phone ?? payload?.email;
      const ifUserExist = await AuthModel.findByUserName(payload?.user_name);

      if (ifUserExist) throw new ConflictError('Oops! Duplicate data: This information already exists.');

      const responseData = {};
      const verification_code = Generator.activateCode();

      if (payload.phone) {
        // TODO Need to be change
        responseData.verification_code = verification_code;
      } else if (payload?.email) {
        await AuthService.sendActivationCode({ email: payload?.email, verification_code });
      }

      payload.start_time = new Date();
      payload.expiration_time = new Date();
      payload.step = 1;

      await RedisMethods.setDataStr(payload.user_name, JSON.stringify({ ...payload, verification_code }));
      const { access_token } = AuthService.genAccessTokenForActivationCode(payload);
      responseData.access_token = access_token;
      return responseData;
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async checkVerificationCode(payload) {
    try {
      if (payload?.step !== 1) throw new UnauthorizedError('Access denied!.');
      const ifExist = JSON.parse(await RedisMethods.getDataStr(payload?.user_name));

      if (!ifExist) throw new ConflictError('Code expired!');

      if (payload?.verification_code !== ifExist?.verification_code) {
        throw new ConflictError('Incorrect code!');
      }

      const jwtData = {
        full_name: payload?.full_name,
        user_name: payload?.user_name,
        email: payload?.email,
        phone: payload?.phone,
        expiration_time: new Date(),
        step: 2,
      };

      return AuthService.genAccessTokenForActivationCode(jwtData);
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async createUser(payload) {
    try {
      if (payload.step !== 2) throw new UnauthorizedError('Access denied!.');
      const userData = {
        full_name: payload?.full_name,
        user_name: payload?.user_name,
        email: payload?.email,
        phone: payload?.phone
      };

      const newUser = await AuthModel.create({
        ...userData,
        password: CryptoUtil.createHash(payload?.password)
      });

      const { access_token, refresh_token } = AuthService.generateTokens({
        ...userData,
        id: CryptoUtil.encrypteByKey(newUser?.id)
      });

      return { access_token, refresh_token };
    } catch (e) {
      throw new ConflictError(e.message);
    }
  }

  static async resend(payload) {
    try {
      if (payload?.step !== 1) throw new UnauthorizedError('Access denied!.');
      const verification_code = Generator.activateCode();
      const responseData = {};

      if (payload?.phone) {
        //  Need to be change
        responseData.verification_code = verification_code;
      } else if (payload?.email) {
        await AuthService.sendActivationCode({ email: payload?.email, verification_code });
      }

      const user = {
        full_name: payload?.full_name,
        user_name: payload?.user_name,
        email: payload?.email,
        phone: payload?.phone,
        step: payload?.step,
        start_time: new Date(),
        expiration_time: payload?.expiration_time
      };

      await RedisMethods.setDataStr(payload?.user_name, JSON.stringify({ ...user, verification_code }));

      const { access_token } = AuthService.genAccessTokenForActivationCode(user);
      responseData.access_token = access_token;
      return responseData;
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async login(payload) {
    const user = await AuthModel.findByUserName(payload?.user_name);

    if (!user) throw new InputValidationError('Invalid username or password');
    if (!CryptoUtil.isValidPassword(payload?.password, user?.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    return AuthService.generateTokens({
      user_name: user?.user_name,
      full_name: user?.full_name,
      email: user?.email,
      phone: user?.phone,
      id: CryptoUtil.encrypteByKey(user?.id)
    });
  }

  static async sendActivationCode(payload) {
    return axios.post(SEND_NOTIFICATION_URL, payload);
  }

  static async changePwd(user_name, password) {
    const user = await AuthModel.findByUserName(user_name);
    if (!user) throw new InputValidationError('Invalid username or password');
    if (!CryptoUtil.isValidPassword(password, user?.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    return true;
  }

  // Password recovery part
  static async checkUser(user_name) {
    try {
      const user = await AuthModel.findByUserName(user_name);
      if (!user) throw new ResourceNotFoundError('Incorrect username!');

      return AuthService.genAccessTokenForActivationCode({
        user_name: user?.user_name,
        email: user?.email,
        phone: user?.phone,
        expiration_time: new Date(),
        step: 1
      });
    } catch (e) {
      throw new ResourceNotFoundError(e);
    }
  }

  static async notification(user, emailOrPhone) {
    try {
      if (user?.step !== 1) throw new UnauthorizedError('Access denied!.');
      const verification_code = Generator.activateCode();
      const payload = {};
      let ifExist;
      if (emailOrPhone?.phone === user?.phone) {
        payload.verification_code = verification_code;
        payload.phone = emailOrPhone?.phone;
        ifExist = verification_code;
      } else if (emailOrPhone?.email === user?.email) {
        await AuthService.sendActivationCode({ email: user?.email, verification_code });
        payload.email = emailOrPhone?.email;
      } else {
        throw new ConflictError('Incorrect data!');
      }

      payload.step = 2;
      payload.user_name = user.user_name;
      payload.start_time = new Date();
      payload.expiration_time = new Date();
      payload.verification_code = verification_code;
      await RedisMethods.setDataStr(user.user_name, JSON.stringify(payload));
      delete payload.verification_code;
      const { access_token } = AuthService.genAccessTokenForActivationCode(payload);
      return { access_token, verification_code: ifExist };
    } catch (e) {
      throw new ResourceNotFoundError(e);
    }
  }

  static async checkVerificationCodeForRecovery(payload) {
    try {
      if (payload?.step !== 2) throw new UnauthorizedError('Access denied!.');
      const ifExist = JSON.parse(await RedisMethods.getDataStr(payload?.user_name));

      if (!ifExist) throw new ConflictError('Code expired!');

      if (payload?.verification_code !== ifExist?.verification_code) {
        throw new ConflictError('Incorrect code!');
      }

      return AuthService.genAccessTokenForActivationCode({
        user_name: payload?.user_name,
        expiration_time: new Date(),
        step: 3,
      });
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async recoveryResend(payload) {
    try {
      if (payload?.step !== 2) throw new UnauthorizedError('Access denied!.');
      const verification_code = Generator.activateCode();
      let ifExist;

      const user = {
        user_name: payload?.user_name,
        step: payload?.step,
        start_time: new Date(),
        expiration_time: payload?.expiration_time
      };

      if (payload?.phone) {
        user.phone = payload?.phone;
        ifExist = verification_code;
      } else if (payload?.email) {
        user.email = payload?.email;
        await AuthService.sendActivationCode({ email: payload?.email, verification_code });
      }

      await RedisMethods.setDataStr(payload?.user_name, JSON.stringify({ ...user, verification_code }));

      const { access_token } = AuthService.genAccessTokenForActivationCode(user);
      return { access_token, verification_code: ifExist };
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async passwordRecovery(payload) {
    try {
      const newPassword = CryptoUtil.createHash(payload?.password);

      const user = await AuthModel.updatePasswordByUserName(payload.user_name, newPassword);

      console.log(user);

      delete user?.password;
      const { access_token, refresh_token } = AuthService.generateTokens({
        ...user,
        id: CryptoUtil.encrypteByKey(user?.id)
      });
      return { access_token, refresh_token };
    } catch (e) {
      throw new UnauthorizedError('User not found or password not updated.');
    }
  }

  static async googleSignUp(google_user) {
    try {
      const user = await AuthModel.findByUserName(google_user?.email);
      if (!_.isEmpty(user)) {
        const { access_token, refresh_token } = AuthService.generateTokens({
          ...user,
          google_id: CryptoUtil.encrypteByKey(user?.google_id),
          id: CryptoUtil.encrypteByKey(user?.id)
        });

        return { access_token, refresh_token };
      }

      const userData = {
        full_name: google_user?.name,
        user_name: google_user?.email,
        email: google_user?.email,
        phone: google_user?.phone,
        google_id: CryptoUtil.encrypteByKey(google_user?.id)
      };

      const newUser = await AuthModel.create(userData);

      const { access_token, refresh_token } = AuthService.generateTokens({
        ...userData,
        google_id: CryptoUtil.encrypteByKey(newUser?.google_id),
        id: CryptoUtil.encrypteByKey(newUser?.id)
      });

      return { access_token, refresh_token };
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async facebookSignUp(facebook_user) {
    try {
      const user = await AuthModel.findByUserName(facebook_user?.email);
      if (!_.isEmpty(user)) {
        const { user_name, full_name, facebook_id, id, email } = user;
        return AuthService.generateTokens({
          full_name,
          user_name,
          email,
          facebook_id: CryptoUtil.encrypteByKey(facebook_id),
          id: CryptoUtil.encrypteByKey(id)
        });
      }

      const userData = {
        full_name: facebook_user?.name,
        user_name: facebook_user?.email,
        email: facebook_user?.email,
        facebook_id: facebook_user?.id
      };

      const newUser = await AuthModel.create(userData);

      const { user_name, full_name, facebook_id, id, email } = newUser;
      return AuthService.generateTokens({
        full_name,
        user_name,
        email,
        facebook_id: CryptoUtil.encrypteByKey(facebook_id),
        id: CryptoUtil.encrypteByKey(id)
      });
    } catch (e) {
      throw new ConflictError(e);
    }
  }
}
