import { IHashService } from '@/domain/contracts/services/hash-contract.service';
import bcrypt from 'bcrypt';

export class BcryptHashService implements IHashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
