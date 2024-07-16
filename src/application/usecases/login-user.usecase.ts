import { LoginUserRequestDTO } from '../dto/request/login-user-request.dto';
import { LoginUserResponseDTO } from '../dto/response/login-user-response.dto';

export interface LoginUserUseCase {
  execute(input: LoginUserRequestDTO): Promise<LoginUserResponseDTO>;
}
