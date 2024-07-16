import { UserRepository } from '../../../database/repositories/user.repository';

export const createUserRepository = (): UserRepository => {
  return new UserRepository();
};
