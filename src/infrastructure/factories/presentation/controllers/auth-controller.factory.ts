import { AuthController } from '@/presentation/controllers/auth.controller';
import { createRegisterUserService } from '../../application/services/register-user-service.factory';
import { createLoginUserService } from '../../application/services/login-user-service.factory';

export const createAuthController = (): AuthController => {
  const registerUserService = createRegisterUserService();
  const loginUserService = createLoginUserService();
  return new AuthController(registerUserService, loginUserService);
};
