import { IUserRepository } from '@/domain/contracts/repositories/user-contract.repository';
import { IHashService } from '@/domain/contracts/services/hash-contract.service';
import { UserAlreadyExistsError } from '@/domain/exceptions/user.exceptions';
import { User } from '@/domain/entities/user.entity';
import { RegisterUserService } from '@/application/services/register-user.service';
import { RegisterUserRequestDTO } from '@/application/dto/request/register-user-request.dto';
import { RegisterUserResponseDTO } from '@/application/dto/response/register-user-response.dto';

describe('RegisterUserService', () => {
  let registerUserService: RegisterUserService;
  let userRepository: jest.Mocked<IUserRepository>;
  let hashService: jest.Mocked<IHashService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    hashService = {
      hash: jest.fn(),
    } as unknown as jest.Mocked<IHashService>;

    registerUserService = new RegisterUserService(userRepository, hashService);
  });

  it('should create a new user', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    hashService.hash.mockResolvedValue('hashed_password');
    const input: RegisterUserRequestDTO = {
      name: 'Rafael',
      email: 'rafael@example.com',
      password: 'password',
    };

    const result: RegisterUserResponseDTO =
      await registerUserService.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      'rafael@example.com',
    );
    expect(hashService.hash).toHaveBeenCalledWith('password');
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual({ name: 'Rafael', email: 'rafael@example.com' });
  });

  it('should throw UserAlreadyExistsError if user already exists', async () => {
    userRepository.findByEmail.mockResolvedValue(
      new User('Lara', 'lane@example.com', 'password'),
    );

    const input = {
      name: 'Lara',
      email: 'lara@example.com',
      password: 'password',
    };

    await expect(registerUserService.execute(input)).rejects.toThrow(
      UserAlreadyExistsError,
    );
  });
});
