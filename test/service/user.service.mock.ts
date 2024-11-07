import { userMockData } from '../data/user.data.mock';

export const MockUserService = {
  addUser: jest.fn().mockResolvedValue(userMockData),
};
