import { IUserRepository } from '@/domain/contracts/repositories/user-contract.repository';
import { IHashService } from '@/domain/contracts/services/hash-contract.service';
import { IJwtService } from '@/domain/contracts/services/jwt-contract.service';
import { LoginUserService } from '@/application/services/login-user.service';
import {
  InvalidPasswordError,
  InvalidTokenError,
  UserNotFoundError,
} from '@/domain/exceptions/user.exceptions';
import { User } from '@/domain/entities/user.entity';
import { LoginUserRequestDTO } from '@/application/dto/request/login-user-request.dto';
import { LoginUserResponseDTO } from '@/application/dto/response/login-user-response.dto';

describe('LoginUserService', () => {
  let loginUserService: LoginUserService;
  let userRepository: jest.Mocked<IUserRepository>;
  let hashService: jest.Mocked<IHashService>;
  let tokenService: jest.Mocked<IJwtService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    hashService = {
      compare: jest.fn(),
    } as unknown as jest.Mocked<IHashService>;

    tokenService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    } as unknown as jest.Mocked<IJwtService>;

    loginUserService = new LoginUserService(
      userRepository,
      hashService,
      tokenService,
    );
  });

  it('should login a user successfully', async () => {
    const user = new User('Rafael', 'rafael@example.com', 'hashed_password');
    userRepository.findByEmail.mockResolvedValue(user);
    hashService.compare.mockResolvedValue(true);
    tokenService.generateToken.mockReturnValue('valid_token');
    tokenService.verifyToken.mockReturnValue(true);

    const input: LoginUserRequestDTO = {
      email: 'rafael@example.com',
      password: 'password',
    };

    const result: LoginUserResponseDTO = await loginUserService.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      'rafael@example.com',
    );
    expect(hashService.compare).toHaveBeenCalledWith(
      'password',
      'hashed_password',
    );
    expect(tokenService.generateToken).toHaveBeenCalledWith(
      user.id,
      user.email,
    );
    expect(tokenService.verifyToken).toHaveBeenCalledWith('valid_token');
    expect(result).toEqual({ token: 'valid_token' });
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const input: LoginUserRequestDTO = {
      email: 'nonexistent@example.com',
      password: 'password',
    };

    await expect(loginUserService.execute(input)).rejects.toThrow(
      UserNotFoundError,
    );
  });

  it('should throw InvalidPasswordError if password is incorrect', async () => {
    const user = new User('Rafael', 'rafael@example.com', 'hashed_password');
    userRepository.findByEmail.mockResolvedValue(user);
    hashService.compare.mockResolvedValue(false);

    const input: LoginUserRequestDTO = {
      email: 'rafael@example.com',
      password: 'wrong_password',
    };

    await expect(loginUserService.execute(input)).rejects.toThrow(
      InvalidPasswordError,
    );
  });

  it('should throw InvalidTokenError if token is invalid', async () => {
    const user = new User('Rafael', 'rafael@example.com', 'hashed_password');
    userRepository.findByEmail.mockResolvedValue(user);
    hashService.compare.mockResolvedValue(true);
    tokenService.generateToken.mockReturnValue('invalid_token');
    tokenService.verifyToken.mockReturnValue(false);

    const input: LoginUserRequestDTO = {
      email: 'rafael@example.com',
      password: 'password',
    };

    await expect(loginUserService.execute(input)).rejects.toThrow(
      InvalidTokenError,
    );
  });
});
