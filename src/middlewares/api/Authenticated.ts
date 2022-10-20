import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from 'routing-controllers';
import passport from 'passport';
import { Service } from 'typedi';

@Service()
export default class Authenticated implements ExpressMiddlewareInterface {
  authenticate = (callback: any) => {
    return passport.authenticate('jwt', { session: false }, callback);
  };

  use(request: any, response: any, next: (err?: any) => any): any {
    return this.authenticate((err: any, user: any, info: any) => {
      if (err || !user) {
        return next(new UnauthorizedError(err || 'Unauthorized'));
      }
      request.user = user;
      return next();
    })(request, response, next);
  }
}
