import { CryptoService, Token } from "../domain/CryptoService";
import { User, UserCreateDTO, UserLoginDTO } from "../domain/User";
import { UserAlreadyExist } from "../domain/UserAlreadyExist";
import { UserRepository } from "../domain/UserRepository";

export class UserAuth {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly crypto: CryptoService
  ) {}

  async login({ email, password }: UserLoginDTO): Promise<AuthData | null> {
    const userToLogin = await this.userRepo.findByEmail(email);

    const hashedPswd = this.crypto.hashPassword(password);

    if (!this.crypto.isPasswordValid(hashedPswd, userToLogin.password)) {
      return null;
    }

    const token = this.crypto.generateToken(userToLogin);

    return {
      token,
      user: userToLogin,
    };
  }

  async signUp({
    fullName,
    email,
    password,
    phone,
  }: UserCreateDTO): Promise<AuthData> {
    if (await this.userRepo.emailExist(email)) {
      throw new UserAlreadyExist("User Auth: signUp");
    }

    const hashedPswd = this.crypto.hashPassword(password);

    const userCreated = await this.userRepo.create({
      fullName,
      email,
      password: hashedPswd,
      phone,
    });

    const token = this.crypto.generateToken(userCreated);

    return {
      token,
      user: userCreated,
    };
  }
}

export type AuthData = { token: Token; user: User };
