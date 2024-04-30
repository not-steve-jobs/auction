// NPM modules

// Local Modules
import AuthService from './auth.service';
import { ErrorsUtil } from '../src/utils';
import { UsersModel } from '../src/models';

const { UnauthorizedError, PermissionError } = ErrorsUtil;

export default class AuthMiddleware {
  static authenticate() {
    return async (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw new UnauthorizedError();

        const access_token = authorizationHeader.split(' ')[1];
        if (!access_token) throw new UnauthorizedError();

        const user = AuthService.validateAccessToken(access_token);

        if (!user) throw new UnauthorizedError();

        const isValidUser = await UsersModel.findByUsername(user?.user_name);

        if (!isValidUser) throw new UnauthorizedError();

        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateFor(accessScopes) {
    const access = accessScopes.map((r) => `access:${r}`);
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) throw new UnauthorizedError();

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new UnauthorizedError();

        const user = AuthService.validateAccessToken(accessToken);
        if (!user) throw new UnauthorizedError();

        const scope = `access:${user.role}`;

        if (!(access.includes(scope))) throw new PermissionError();
        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
