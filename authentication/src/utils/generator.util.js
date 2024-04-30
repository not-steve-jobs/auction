// NPM Modules

// Local Modules
import config from '../config/variables.config';

const { VERIFICATION_CODE } = config;

export default class Generator {
  static activateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(Number(VERIFICATION_CODE.LENGTH))].map(() => chars
      .charAt(Math.floor(Math.random() * chars.length))).join('');
  }
}
