import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePasswords, hashPassword } from './util';
import { IRegister } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(email: string, inputPassword: string) {
    const user = await this.userService.getUserByEmailForLogin(email);
    if (!user) {
      return false;
    }

    const isValidPassword = await comparePasswords(inputPassword, user.password);
    if (!isValidPassword) {
      return false;
    }

    // TODO: JWT 토큰 발급해서 반환 필요

    return true;
  }

  async register(args: IRegister) {
    const hashedPassword = await hashPassword(args.password);
    await this.userService.addUser({ ...args, password: hashedPassword });
    return true;
  }
}
