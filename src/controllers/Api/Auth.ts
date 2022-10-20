import { Request, Response } from 'express';
import {
  JsonController,
  Get,
  Req,
  Res,
  Post,
  Body,
  UseBefore,
} from 'routing-controllers';

import { Service } from 'typedi';

import AuthService from '../../../src/services/AuthService';
import RegisterBody from '../../requests/RegisterBody';
import Authenticated from '../../middlewares/api/Authenticated';
import HasRole from '../../middlewares/api/HasRole';
import LoginBody from '../../requests/LoginBody';
import { IUserRole } from '../../models/User';

@JsonController('/auth')
@Service()
class Auth {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body({ validate: true, required: true }) body: RegisterBody) {
    return await this.authService.signUp(body);
  }

  @Post('/login')
  async login(@Body({ validate: true, required: true }) body: LoginBody) {
    return await this.authService.authenticate(body);
  }

  @Get('/user')
  @UseBefore(Authenticated)
  async user(@Req() request: Request, @Res() response: Response) {
    return response.send(request.user);
  }

  @Get('/admin')
  @UseBefore(Authenticated, HasRole(IUserRole.ADMIN))
  async admin(@Req() request: Request, @Res() response: Response) {
    return response.send(request.user);
  }
}

export default Auth;
