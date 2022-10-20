import { Application } from 'express';

import { useExpressServer } from 'routing-controllers';

import path from 'path';

import Env from './Env';
import Log from '../middlewares/Log';

import NotFound from '../middlewares/api/NotFound';
import ErrorHandler from '../middlewares/api/ErrorHandler';

class Routes {
  public mountWeb(_express: Application): Application {
    Log.info('Routes :: Mounting Web Routes...');

    return _express;
  }

  public mountApi(_express: Application): Application {
    const apiPrefix = Env.config().apiPrefix;
    Log.info('Routes :: Mounting API Routes...');

    let controllers = Env.config().development
      ? [
          path.join(__dirname + '/../controllers/Api/*/*.ts'),
          path.join(__dirname + '/../controllers/Api/*.ts'),
        ]
      : [
          path.join(__dirname + '/../controllers/Api/*/*.js'),
          path.join(__dirname + '/../controllers/Api/*.js'),
        ];

    useExpressServer(_express, {
      development: false,
      defaultErrorHandler: false,
      routePrefix: `/${apiPrefix}`,
      controllers: controllers,
      middlewares: [ErrorHandler, NotFound],
    });

    return _express;

    // return _express.use(`/${apiPrefix}`, apiRouter);
  }
}

export default new Routes();
