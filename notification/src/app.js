// NPM Modules
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Local modules
import config from './config/variables.config';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';
import Api from './api';

const { DISABLE_REQUEST_LOG } = config;

class App {
  /* @constructor */
  constructor() {
    this.app = express();
  }

  /* @description Initialize the App. */
  async init() {
    this._setRequestLogger();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._setErrorHandler();
  }

  /* @private
    * @description Set request logger.
  */
  _setRequestLogger() {
    if (DISABLE_REQUEST_LOG !== '1') {
      this.app.use(morgan('dev'));
    }
  }

  /* @private
    * @description Set Cross-origin resource sharing.
    *  Reflect any request that is coming from an origin ending with one specified in configs.
  */
  _setCors() {
    this.app.use(cors({
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      optionsSuccessStatus: 200,
      maxAge: -1
    }));
  }

  /* @private
    * @description Set body parser:
    *  1. Parses the text as JSON & exposes the resulting object on req.body (limit 1 mb).
  */
  _setRequestParser() {
    this.app.use(bodyParser.json());
    const options = { limit: '200mb', extended: false };
    this.app.use(bodyParser.urlencoded(options));
    this.app.use(express.json({ limit: '200mb' }));
  }

  /* @private
    * @description Initialize API.
  */
  _initializeApi() {
    this.app.use('/api/v1', Api);
  }

  /**
   * @private
   * @description General error handler.
   */
  _setErrorHandler() {
    this.app.use(ErrorHandlerMiddleware.init);
  }
}

export default new App();
