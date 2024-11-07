import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hashPassword } from './util';
import { IRegister } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(args: IRegister) {
    const hashedPassword = await hashPassword(args.password);
    await this.userService.addUser({ ...args, password: hashedPassword });
    return true;
  }
}
