import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { IAddUser } from './interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    return this.userRepository.getOneById(id);
  }

  async getUsers(offset: number, limit: number) {
    return this.userRepository.getMany(offset, limit);
  }

  async addUser(args: IAddUser) {
    return this.userRepository.add(args);
  }
}
