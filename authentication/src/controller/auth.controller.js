// NPM Modules

// Local Modules
import { AuthService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
  static async login(req, res, next) {
    try {
      const user = req.body;
      const { access_token, refresh_token } = await AuthService.login(user);
      SuccessHandlerUtil.handleAdd(res, next, { access_token, refresh_token });
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req, res, next) {
    try {
      const payload = req.body;
      const resData = await AuthService.signUp(payload);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async checkVerificationCode(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { verification_code } = req.body;
      const activationCodeResult = await AuthService.checkVerificationCode({
        verification_code,
        ...user
      });
      SuccessHandlerUtil.handleAdd(res, next, activationCodeResult);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { password } = req.body;
      const resData = await AuthService.createUser({ password, ...user });
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async resend(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const resData = await AuthService.resend(user);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refresh_token } = req.body;

      const refreshResult = await AuthService.refresh(refresh_token);
      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }

  // Password recovery part
  static async checkUser(req, res, next) {
    try {
      const { user_name } = req.body;
      const access_token = await AuthService.checkUser(user_name);
      SuccessHandlerUtil.handleAdd(res, next, access_token);
    } catch (error) {
      next(error);
    }
  }

  static async notification(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const emailOrPhone = req.body;
      const resData = await AuthService.notification(user, emailOrPhone);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async checkVerificationCodeForRecovery(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { verification_code } = req.body;
      const activationCodeResult = await AuthService.checkVerificationCodeForRecovery({
        verification_code,
        ...user
      });
      SuccessHandlerUtil.handleAdd(res, next, activationCodeResult);
    } catch (error) {
      next(error);
    }
  }

  static async recoveryResend(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const resData = await AuthService.recoveryResend(user);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async passwordRecovery(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { password } = req.body;
      const resData = await AuthService.passwordRecovery({ password, ...user });
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async googleSignUp(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const resData = await AuthService.googleSignUp(user);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async facebookSignUp(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const resData = await AuthService.facebookSignUp(user);
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
