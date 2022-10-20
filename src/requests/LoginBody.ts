import { IsDefined } from 'class-validator';

export default class LoginBody {
  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}
