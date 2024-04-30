// NPM Modules
import Redis from 'ioredis';

// Local Modules
import config from '../config/variables.config';
import loggerUtil from '../utils/logger.util';

const { REDIS } = config;

class RedisClient {
  constructor() {
    this.client = new Redis({
      host: REDIS.HOST, // Use the container name as the host
      port: Number(REDIS.PORT), // Redis default port
    });

    this.client.on('connect', () => {
      loggerUtil.info('Redis connected successfully');
    });
  }
}

export default RedisClient;
