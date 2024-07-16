import { IUserRepository } from '@/domain/contracts/repositories/user-contract.repository';
import { LoginUserUseCase } from '../usecases/login-user.usecase';
import { IHashService } from '@/domain/contracts/services/hash-contract.service';
import { IJwtService } from '@/domain/contracts/services/jwt-contract.service';
import { LoginUserRequestDTO } from '../DTO/Request/login-user-request.dto';
import { LoginUserResponseDTO } from '../DTO/Response/login-user-response.dto';
import {
  InvalidPasswordError,
  InvalidTokenError,
  UserNotFoundError,
} from '@/domain/exceptions/user.exceptions';

export class LoginUserService implements LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: IJwtService,
  ) {}

  async execute(input: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new UserNotFoundError();
    const passwordMatch = await this.hashService.compare(
      input.password,
      user.password,
    );
    if (!passwordMatch) throw new InvalidPasswordError();
    const token = this.tokenService.generateToken(user.id, user.email);
    const verifyToken = this.tokenService.verifyToken(token);
    if (!verifyToken) throw new InvalidTokenError();
    return {
      token,
    };
  }
}
