import { Request, Response, NextFunction } from 'express';
import { IJwtService } from '@/domain/contracts/services/jwt-contract.service';

export class AuthMiddleware {
  constructor(private readonly jwtService: IJwtService) {}

  authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ message: 'Token not provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Token not provided' });
      return;
    }

    const isValid = this.jwtService.verifyToken(token);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    next();
  }

  auth() {
    return this.authenticate.bind(this);
  }
}
