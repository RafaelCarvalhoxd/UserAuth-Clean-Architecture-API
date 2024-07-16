import { Router } from 'express';
import { createAuthController } from '@/infrastructure/factories/presentation/controllers/auth-controller.factory';
import { createJwtService } from '@/infrastructure/factories/infra/services/jwt-service.factory';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const configureRoutes = (): Router => {
  const router = Router();

  const authController = createAuthController();
  const jwtService = createJwtService();
  const authMiddleware = new AuthMiddleware(jwtService);

  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/login', (req, res) => authController.login(req, res));

  router.use(authMiddleware.auth());

  return router;
};
