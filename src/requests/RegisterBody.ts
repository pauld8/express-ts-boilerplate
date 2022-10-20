import { IsDefined } from 'class-validator';

export default class RegisterBody {
  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}
