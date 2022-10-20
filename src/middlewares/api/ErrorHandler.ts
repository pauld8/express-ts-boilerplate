import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import { Service } from 'typedi';

import Env from '../../../src/loaders/Env';
import Log from '../Log';

@Middleware({ type: 'after' })
@Service()
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: any, next: (err?: any) => any) {
    if (!res.headersSent) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      Log.error(
        `Path '${req.originalUrl}' ${error.message} [IP: '${ip}']`,
        true
      );
      Log.error(error.stack, false);
      res.status(500);

      const apiPrefix = Env.config().apiPrefix;

      if (req.originalUrl.includes(`/${apiPrefix}/`)) {
        if (error.name && error.name === 'UnauthorizedError') {
          res.status(401);
        }

        return res.json({
          name: error.name,
          error: error.message,
        });
      }

      return res.render('pages/error', {
        error: error.stack,
        title: 'Under Maintenance',
      });
    }
  }
}
