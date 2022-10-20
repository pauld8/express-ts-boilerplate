import { Application } from 'express';
import passport from 'passport';

import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import User from '../models/User';
import Log from '../../src/middlewares/Log';
import Env from './Env';

export class Passport {
  public static init(_express: Application): Application {
    Log.info('Passport :: Mounting Passport...');

    _express.use(passport.initialize());

    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: Env.config().jwtSecret,
        },
        async (jwtPlayload, callback) => {
          try {
            const user = await User.findOne({
              where: { id: jwtPlayload.user.id },
            });

            if (!user) {
              return callback(null);
            }
            return callback(null, user);
          } catch (e) {
            callback(null);
          }
        }
      )
    );

    return _express;
  }
}

export default Passport;
