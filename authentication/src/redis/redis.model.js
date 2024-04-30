// NPM Modules

// Local Modules
import config from '../config/variables.config';
import RedisClient from '../storage/redis.storage';

const { VERIFICATION_CODE, PREFIX } = config;

const redis = new RedisClient();

// Set a key-value pair
class RedisMethods {
  static setDataStr(key, value) {
    return redis.client.set(`${PREFIX.AUTH}${key}`, value, 'EX', Number(VERIFICATION_CODE.START_TIME));
  }

  // Get the value of a key
  static getDataStr(key) {
    return redis.client.get(`${PREFIX.AUTH}${key}`);
  }

  // TODO delete deleteData method
  static async deleteData(key) {
    return redis.client.del(key);
  }
}

export default RedisMethods;
