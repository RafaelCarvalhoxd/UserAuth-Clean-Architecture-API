import { JwtService } from '@/infrastructure/services/jwt.service';

export const createJwtService = (): JwtService => {
  return new JwtService();
};
