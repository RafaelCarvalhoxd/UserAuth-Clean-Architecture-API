import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/application/usecases/register-user.usecase';
import { LoginUserUseCase } from '@/application/usecases/login-user.usecase';
import { handleSuccess } from '../handlers/success/succes.handler';
import { handleError } from '../handlers/errors/erros.handler';

export class AuthController {
  constructor(
    private registerUserUsecase: RegisterUserUseCase,
    private loginUserUsecase: LoginUserUseCase,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const data = await this.registerUserUsecase.execute({
        name,
        email,
        password,
      });
      return handleSuccess.created(res, data, 'User created');
    } catch (error) {
      return handleError.conflict(res);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const data = await this.loginUserUsecase.execute({ email, password });
      return handleSuccess.ok(res, data, 'User logged');
    } catch (error) {
      return handleError.unauthorized(res);
    }
  }
}
