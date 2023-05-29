import { User } from "./User";

export interface CryptoService {
  hashPassword(pswd: string): string;
  isPasswordValid(pswd1: string, pswd2: string): boolean;
  generateToken(user: User): Token;
}

export interface Token {
  acces_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}
