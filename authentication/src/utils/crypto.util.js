// NPM Modules
import crypto from 'crypto';
import bCrypt from 'bcryptjs';

// Local Modules
import config from '../config/variables.config';
import ErrorsUtil from './errors.util';

const { JWT_HASH_SECRET } = config;

const { UnauthorizedError } = ErrorsUtil;

export default class CryptoUtil {
  /**
   * @param {string} password
   *  @return {string}
   * @description Creates hash password from a given string.
   */
  static createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  /**
   * @param {string} password
   * @param {string} hashPassword
   * @returns {boolean}
   * @description Compares string password with hash password.
   */
  static isValidPassword(password, hashPassword) {
    return bCrypt.compareSync(password, hashPassword);
  }

  /**
   * @param {string} string
   *  @return {string}
   * @description Creates encrypt by key from a given string.
   */
  static encrypteByKey(string) {
    try {
      const secret_iv = `${JWT_HASH_SECRET}_iv`;

      const hashKey = crypto.createHash('sha256');
      hashKey.update(JWT_HASH_SECRET);
      const key = hashKey.digest('hex').substring(0, 32);

      const hashIv = crypto.createHash('sha256');
      hashIv.update(secret_iv);
      const iv = hashIv.digest('hex').substring(0, 16);

      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(string.toString(), 'utf-8', 'base64');
      encrypted += cipher.final('base64');
      encrypted = Buffer.from(encrypted, 'utf-8').toString('base64');
      return encrypted;
    } catch (error) {
      throw new UnauthorizedError('Error!');
    }
  }

  /**
   * @param {string} string
   *  @return {string}
   * @description Decrypt by key from a given string.
   */
  static decrypteByKey(encrypted) {
    try {
      const secret_key = JWT_HASH_SECRET;
      const secret_iv = `${secret_key}_iv`;

      const hashKey = crypto.createHash('sha256');
      hashKey.update(secret_key);
      const key = hashKey.digest('hex').substring(0, 32);

      const hashIv = crypto.createHash('sha256');
      hashIv.update(secret_iv);
      const iv = hashIv.digest('hex').substring(0, 16);

      encrypted = Buffer.from(encrypted, 'base64').toString('utf-8');
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');

      return decrypted;
    } catch (error) {
      throw new UnauthorizedError('AccessToken User Data Error!');
    }
  }
}
