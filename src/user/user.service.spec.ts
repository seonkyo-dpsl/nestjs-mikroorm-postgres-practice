import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository';

import { userMockData } from '../../test/data';
import { MockUserRepository } from '../../test/repository';
import { Exceptions } from '../common/exceptions';

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

    it('ID에 해당하는 사용자가 없으면 404에러를 반환한다.', async () => {
      // given
      jest.spyOn(userRepository, 'getOneById').mockResolvedValue(null);

      const userId = 1;

      // when - then
      await expect(service.getUserById(userId)).rejects.toThrow(Exceptions.notFoundTarget('user'));
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

  describe('removeUser', () => {
    it('사용자를 삭제할 수 있다.', async () => {
      // given
      const userId = userMockData.id;

      // when
      const result = await service.removeUserById(userId);

      // then
      expect(result).toBe(true);
      expect(userRepository.removeById).toHaveBeenCalledTimes(1);
      expect(userRepository.removeById).toHaveBeenCalledWith(userId);
    });
  });
});
