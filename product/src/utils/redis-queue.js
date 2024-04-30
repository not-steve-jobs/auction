// NPM Modules
import Queue from 'bull';

// Local Modules
import ErrorsUtil from './errors.util';
import config from '../config/variables.config';

const { REDIS } = config;
const { ConflictError } = ErrorsUtil;
const { QUEUES } = REDIS;

const queueOptions = {
  redis: { host: REDIS.HOST, port: REDIS.PORT },
  limit: { max: 1, duration: 1000 },
};

export default class RedisQueueUtil {
  static async addProductToQueue(payload) {
    try {
      const queue = new Queue(QUEUES.BID, queueOptions);
      await queue.add(payload);
    } catch (error) {
      throw new ConflictError('Error!');
    }
  }

  static async getProductFromQueue() {
    try {
      const queue = new Queue(QUEUES.BID, queueOptions);
      await queue.process((payload, done) => {
        console.log(payload.data);
        done();
      });
    } catch (error) {
      throw new ConflictError('Error!');
    }
  }
}
