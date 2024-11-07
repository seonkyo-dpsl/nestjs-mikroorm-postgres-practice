import { userMockData } from '../data/user.data.mock';

export const MockUserService = {
  getUserByEmailForLogin: jest.fn().mockResolvedValue(userMockData),
  addUser: jest.fn().mockResolvedValue(userMockData),
};
