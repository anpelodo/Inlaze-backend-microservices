import { CryptoService, Token } from "../domain/CryptoService";
import { User } from "../domain/User";

export class CryptoServiceStub implements CryptoService {
  hashPassword(pswd: string): string {
    return pswd + "hash";
  }
  isPasswordValid(pswd1: string, pswd2: string): boolean {
    return pswd1 === pswd2;
  }
  generateToken(user: User): Token {
    const token = "token" + user.id + user.email;

    return {
      acces_token: token,
      token_type: "bearer",
    };
  }
}
