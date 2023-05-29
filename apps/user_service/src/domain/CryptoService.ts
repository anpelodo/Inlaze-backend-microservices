import { User } from "./User";

export interface CryptoService {
  hashPassword(pswd: string): string;
  isPasswordValid(pswd1: string, pswd2: string): boolean;
  generateToken(user: User): string;
}
