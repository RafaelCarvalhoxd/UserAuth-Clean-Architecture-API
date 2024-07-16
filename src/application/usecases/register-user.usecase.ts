import { RegisterUserRequestDTO } from '../dto/request/register-user-request.dto';
import { RegisterUserResponseDTO } from '../dto/response/register-user-response.dto';

export interface RegisterUserUseCase {
  execute(input: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>;
}
