// NPM modules
import jwt from 'jsonwebtoken';

// Local modules
import { ErrorsUtil } from '../src/utils';
import config from '../src/config/variables.config';

const { AUTH } = config;
const { JWT_ACCESS_SECRET } = AUTH;
const { UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }
}
