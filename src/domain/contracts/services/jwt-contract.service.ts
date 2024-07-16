export interface IJwtService {
  generateToken(userId: string, email: string): string;
  verifyToken(token: string): boolean;
}
