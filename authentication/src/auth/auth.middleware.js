// NPM Modules

// Local Modules
import AuthService from '../services/auth.service';
import { ErrorsUtil, isValidToken } from '../utils';

const { UnauthorizedError } = ErrorsUtil;

export default class AuthMiddleware {
  static authenticate() {
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw new UnauthorizedError();

        const access_token = authorizationHeader.split(' ')[1];
        if (!access_token) throw new UnauthorizedError();

        const user = AuthService.validateAccessToken(access_token);

        if (!user) throw new UnauthorizedError();

        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateForRegistration() {
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw new UnauthorizedError();

        const access_token = authorizationHeader.split(' ')[1];
        if (!access_token) throw new UnauthorizedError();

        const user = AuthService.validateAccessTokenForRegistration(access_token);

        if (!user) throw new UnauthorizedError();

        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateForGoogleId() {
    return async (req, res, next) => {
      try {
        const googleToken = req.body.google_token;

        if (!googleToken) throw new UnauthorizedError();

        const user = await isValidToken.googleTokenVerification(googleToken);

        if (!user.verified_email) throw new UnauthorizedError();

        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateForFacebookId() {
    return async (req, res, next) => {
      try {
        const facebookToken = req.body.facebook_token;

        if (!facebookToken) throw new UnauthorizedError();

        const user = await isValidToken.facebookTokenVerification(facebookToken);

        if (user.error) throw new UnauthorizedError();
        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
