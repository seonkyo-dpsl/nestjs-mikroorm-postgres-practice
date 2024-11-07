import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { MockUserService } from '../../test/service';
import { userMockData } from '../../test/data';

import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: MockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('비밀번호가 일치하면 로그인에 성공한다.', async () => {
      // given
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const user = userMockData;
      jest.spyOn(userService, 'getUserByEmailForLogin').mockResolvedValue(user);

      const email = user.email;
      const password = 'password';

      // when
      const result = await service.login(email, password);

      // then
      expect(result).toBe(true);
      expect(userService.getUserByEmailForLogin).toHaveBeenCalledTimes(1);
      expect(userService.getUserByEmailForLogin).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });

    it('비밀번호가 일치하지 않으면 로그인에 실패한다.', async () => {
      // given
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const user = userMockData;
      jest.spyOn(userService, 'getUserByEmailForLogin').mockResolvedValue(user);

      const email = user.email;
      const password = 'wrongPassword';

      // when
      const result = await service.login(email, password);

      // then
      expect(result).toBe(false);
      expect(userService.getUserByEmailForLogin).toHaveBeenCalledTimes(1);
      expect(userService.getUserByEmailForLogin).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });
  });

  describe('register', () => {
    it('회원가입하는 경우 비밀번호를 암호화한다.', async () => {
      // given
      const user = userMockData;
      (bcrypt.hash as jest.Mock).mockResolvedValue(user.password);

      jest.spyOn(userService, 'addUser').mockResolvedValue(user);

      const email = user.email;
      const password = 'password';
      const name = user.name;

      // when
      const result = await service.register({ email, password, name });

      // then
      expect(result).toBe(true);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(userService.addUser).toHaveBeenCalledTimes(1);
      expect(userService.addUser).toHaveBeenCalledWith({ email, password: user.password, name });
    });
  });
});
