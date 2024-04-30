// NPM Modules
import crypto from 'crypto';

// Local Modules
import config from '../config/variables.config';
import ErrorsUtil from './errors.util';

const { JWT_HASH_SECRET, HASH_LENGTH } = config;
const { ConflictError } = ErrorsUtil;

export default class CryptoUtil {
  /**
   * @param {string} string
   *  @return {string}
   * @description Creates encrypt by key from a given string.
   */
  static encryptByKey(string) {
    try {
      const secret_key = JWT_HASH_SECRET;
      const secret_iv = `${secret_key}_iv`;

      const hashKey = crypto.createHash('sha256');
      hashKey.update(secret_key);
      const key = hashKey.digest('hex').substring(0, HASH_LENGTH);

      const hashIv = crypto.createHash('sha256');
      hashIv.update(secret_iv);
      const iv = hashIv.digest('hex').substring(0, 16);

      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(string.toString(), 'utf-8', 'base64');
      encrypted += cipher.final('base64');
      encrypted = Buffer.from(encrypted, 'utf-8').toString('base64');

      return encrypted;
    } catch (error) {
      throw new ConflictError('Error!');
    }
  }

  /**
   * @param {string} string
   *  @return {string}
   * @description Decrypt by key from a given string.
   */
  static decryptByKey(encrypted) {
    try {
      const secret_key = JWT_HASH_SECRET;
      const secret_iv = `${secret_key}_iv`;

      const hashKey = crypto.createHash('sha256');
      hashKey.update(secret_key);
      const key = hashKey.digest('hex').substring(0, HASH_LENGTH);

      const hashIv = crypto.createHash('sha256');
      hashIv.update(secret_iv);
      const iv = hashIv.digest('hex').substring(0, 16);

      encrypted = Buffer.from(encrypted, 'base64').toString('utf-8');
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');

      return +decrypted;
    } catch (error) {
      throw new ConflictError('No such data exists!');
    }
  }
}
