import { userMockData } from '../data/user.data.mock';

export const MockUserRepository = {
  getOneById: jest.fn().mockResolvedValue(userMockData),
  add: jest.fn().mockResolvedValue(userMockData),
};
