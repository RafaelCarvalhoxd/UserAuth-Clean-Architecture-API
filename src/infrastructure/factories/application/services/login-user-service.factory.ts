import { LoginUserService } from '@/application/services/login-user.service';
import { createUserRepository } from '../../infra/repositories/user-repo.factory';
import { createBcryptHashService } from '../../infra/services/bcrypt-hash-service.factory';
import { createJwtService } from '../../infra/services/jwt-service.factory';

export const createLoginUserService = (): LoginUserService => {
  const userRepository = createUserRepository();
  const hashService = createBcryptHashService();
  const jwtService = createJwtService();
  return new LoginUserService(userRepository, hashService, jwtService);
};
