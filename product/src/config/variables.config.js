// NPM modules
import path from 'path';

require('dotenv').config();

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT || 3006,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS?.split(',') || '*',
  END_DATE: '2053-12-05',
  DAY: process.env.DAY,
  HOST: process.env.LOCAL_HOST,
  JWT_HASH_SECRET: process.env.JWT_HASH_SECRET,
  BULL_BOARD_BASE_PATH: process.env.BULL_BOARD_BASE_PATH,
  HASH_LENGTH: 32,
  WEEKDAYS: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  IMG_DIR: path.join(__dirname, `../../../${process.env.IMAGES_UPLOAD_PATH}`),
  VID_DIR: path.join(__dirname, `../../../${process.env.VIDEOS_UPLOAD_PATH}`),

  PSQL: {
    PORT: process.env.PSQL_PORT,
    HOST: process.env.PSQL_HOST,
    USER: process.env.PSQL_USER,
    DATABASE: process.env.PSQL_DATABASE,
    PASSWORD: process.env.PSQL_PASSWORD
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '2m',
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || '1d'
  },

  STORAGE: {
    IMAGES: process.env.IMAGES_UPLOAD_PATH,
    VIDEOS: process.env.VIDEOS_UPLOAD_PATH,
    IMAGE_ARCHIVE: process.env.IMAGE_ARCHIVE,
    VIDEO_ARCHIVE: process.env.VIDEO_ARCHIVE,
  },

  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    QUEUES: { BID: process.env.BID_QUEUE, }
  }
};

export default config;
