import { IUserRepository } from '@/domain/contracts/repositories/user-contract.repository';
import { RegisterUserUseCase } from '../usecases/register-user.usecase';
import { RegisterUserRequestDTO } from '../dto/request/register-user-request.dto';
import { IHashService } from '@/domain/contracts/services/hash-contract.service';
import { User } from '@/domain/entities/user.entity';
import { RegisterUserResponseDTO } from '../dto/response/register-user-response.dto';
import { UserAlreadyExistsError } from '@/domain/exceptions/user.exceptions';

export class RegisterUserService implements RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashGenerator: IHashService,
  ) {}
  async execute(
    input: RegisterUserRequestDTO,
  ): Promise<RegisterUserResponseDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      input.email,
    );
    if (userAlreadyExists) throw new UserAlreadyExistsError();
    const hashedPassword = await this.hashGenerator.hash(input.password);
    const user = new User(input.name, input.email, hashedPassword);
    await this.userRepository.create(user);
    return {
      name: user.name,
      email: user.email,
    };
  }
}
