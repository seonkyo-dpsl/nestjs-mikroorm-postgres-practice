import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { IAddUser } from './interface';
import { Exceptions } from '../common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw Exceptions.notFoundTarget('user');
    }

    return user;
  }

  async getUserByEmailForLogin(email: string) {
    return this.userRepository.getOneByEmailForLogin(email);
  }

  async getUsers(offset: number, limit: number) {
    return this.userRepository.getMany(offset, limit);
  }

  async addUser(args: IAddUser) {
    return this.userRepository.add(args);
  }

  async removeUserById(id: number) {
    return this.userRepository.removeById(id);
  }
}
