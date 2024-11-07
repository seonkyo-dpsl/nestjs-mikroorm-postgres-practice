import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository';

import { userMockData } from '../../test/data';
import { MockUserRepository } from '../../test/repository';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('ID로 사용자를 조회할 수 있다.', async () => {
      // given
      const user = userMockData;
      jest.spyOn(userRepository, 'getOneById').mockResolvedValue(user);

      const userId = 1;

      // when
      const result = await service.getUserById(userId);

      // then
      expect(result).toEqual(user);
      expect(userRepository.getOneById).toHaveBeenCalledTimes(1);
      expect(userRepository.getOneById).toHaveBeenCalledWith(userId);
    });
  });

  describe('addUser', () => {
    it('사용자를 추가할 수 있다.', async () => {
      // given
      const user = userMockData;

      // when
      const result = await service.addUser(user);

      // then
      expect(result).toEqual(user);
      expect(userRepository.add).toHaveBeenCalledTimes(1);
      expect(userRepository.add).toHaveBeenCalledWith(user);
    });
  });
});
