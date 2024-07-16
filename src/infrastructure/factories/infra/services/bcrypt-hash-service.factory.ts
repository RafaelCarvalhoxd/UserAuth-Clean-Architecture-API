import { BcryptHashService } from '@/infrastructure/services/bcrypt-hash.service';

export const createBcryptHashService = (): BcryptHashService => {
  return new BcryptHashService();
};
