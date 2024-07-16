import { IUserRepository } from '@/domain/contracts/repositories/user-contract.repository';
import { User } from '@/domain/entities/user.entity';
import { prisma } from '../client/prisma.client';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;
    return new User(user.name, user.email, user.password);
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
