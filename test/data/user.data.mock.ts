import { User } from '../../src/user/entity';

export const userMockData: Readonly<User> = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'hashedPassword123',
  createdAt: new Date('2023-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-01-01T00:00:00.000Z'),
};
