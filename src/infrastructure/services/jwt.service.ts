import { IJwtService } from '@/domain/contracts/services/jwt-contract.service';
import jwt from 'jsonwebtoken';

export class JwtService implements IJwtService {
  private readonly secret = process.env.JWT_SECRET || 'secret';
  generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, this.secret, {
      expiresIn: '1d',
    });
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (err) {
      return false;
    }
  }
}
