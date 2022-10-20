import { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import IConfig from '../../src/interfaces/IConfig';
import Log from '../../src/middlewares/Log';

class Env {
  public static config(): IConfig {
    const env = process.env.NODE_ENV;
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpire = process.env.JWT_EXPIRE;

    const port = process.env.PORT || 3000;
    const mongoUrl = process.env.MONGO_URL;
    const mongoEnabled = process.env.MONGO_ENABLED || true;

    const apiPrefix = process.env.API_PREFIX;
    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const appUrl =
      process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

    const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
    const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

    const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
    const redisHttpHost = process.env.REDIS_QUEUE_HOST || '127.0.0.1';
    const redisHttpPassword = process.env.REDIS_QUEUE_PASSWORD || 3;
    const redisPrefix = process.env.REDIS_QUEUE_DB || 'q';
    const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;

    const sqlUser = process.env.SQL_USER;
    const sqlPassword = process.env.SQL_PASSWORD;
    const sqlDbName = process.env.SQL_DB_NAME;
    const sqlHost = process.env.SQL_HOST;
    const sqlPort = process.env.SQL_PORT || 1433;
    const sqlEnabled = process.env.SQL_ENABLED || false;

    const webEnabled = process.env.WEB_ENABLED || true;

    return {
      development: env == 'development',
      port,
      jwtSecret,
      jwtExpire,
      mongoEnabled: mongoEnabled == 'true' ? true : false,
      webEnabled: webEnabled == 'true' ? true : false,
      sqlEnabled: sqlEnabled == 'true' ? true : false,
      sqlHost,
      sqlPort,
      sqlUser,
      sqlPassword,
      sqlDbName,
      mongoUrl,
      apiPrefix,
      isCORSEnabled,
      appUrl,
      maxUploadLimit,
      maxParameterLimit,
      redisHttpPort,
      redisHttpHost,
      redisHttpPassword,
      redisPrefix,
      redisDB,
      queueMonitor: queueMonitor == 'true' ? true : false,
      queueMonitorHttpPort,
    };
  }

  public static init(_express: Application): Application {
    Log.info('Configuration :: Booting @ Master...');

    dotenv.config({
      path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
    });

    _express.locals.app = this.config();

    return _express;
  }
}

export default Env;
