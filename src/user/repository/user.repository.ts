import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../entity';
import { IAdd } from './interface';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async getOneById(id: number) {
    return this.userRepository.findOne(id);
  }

  async add(args: IAdd) {
    const user = this.userRepository.create(args);
    this.em.persist(user);
    await this.em.flush();

    return user;
  }
}
