import { RegisterUserService } from '@/application/services/register-user.service';
import { createUserRepository } from '../../infra/repositories/user-repo.factory';
import { createBcryptHashService } from '../../infra/services/bcrypt-hash-service.factory';

export const createRegisterUserService = (): RegisterUserService => {
  const userRepository = createUserRepository();
  const hashService = createBcryptHashService();
  return new RegisterUserService(userRepository, hashService);
};
