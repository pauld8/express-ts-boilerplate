import jwt from 'jsonwebtoken';

import { Service } from 'typedi';
import RegisterBody from '../requests/RegisterBody';
import { UnauthorizedError } from 'routing-controllers';

import Mssql from '../loaders/Mssql';
import { ServiceResponse } from './response/ServiceResponse';
import User from '../models/User';
import Env from '../loaders/Env';
import LoginBody from '../requests/LoginBody';

@Service()
export default class AuthService {
  constructor() {}

  async signUp(registerBody: RegisterBody) {
    return new ServiceResponse<string>('test');
  }

  async authenticate(loginBody: LoginBody) {
    try {
      const user = await User.scope('withPassword').findOne({
        where: { username: loginBody.username },
      });

      if (!user) {
        throw Error;
      }

      const body = { id: user.id };
      const token = jwt.sign({ user: body }, Env.config().jwtSecret, {
        expiresIn: parseInt(Env.config().jwtExpire),
      });

      if (User.validatePassword(loginBody.password, user.hash, user.salt)) {
        return new ServiceResponse<any>({
          token: token,
        });
      }

      throw Error;
    } catch (e) {
      throw new UnauthorizedError('Invalid credentials');
    }
  }
}
