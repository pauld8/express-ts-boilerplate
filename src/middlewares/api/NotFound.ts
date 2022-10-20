import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import Log from '../Log';
import Env from '../../loaders/Env';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export default class NotFound implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next?: NextFunction): void {
    if (!res.headersSent) {
      const apiPrefix = Env.config().apiPrefix;
      const webEnabled = Env.config().webEnabled;

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']`);
      if (
        req.xhr ||
        req.originalUrl.includes(`/${apiPrefix}/`) ||
        !webEnabled
      ) {
        res.status(404);
        res.send({ error: 'Not Found' });
      } else {
        res.status(404);
        return res.render('pages/error', {
          title: 'Page Not Found',
          error: [],
        });
      }

      res.end();
    }
  }
}
