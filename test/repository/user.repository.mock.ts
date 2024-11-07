import { userMockData } from '../data/user.data.mock';

export const MockUserRepository = {
  add: jest.fn().mockResolvedValue(userMockData),
};
