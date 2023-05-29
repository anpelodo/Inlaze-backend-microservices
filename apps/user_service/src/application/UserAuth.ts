import { CryptoService } from "../domain/CryptoService";
import { User, UserCreateDTO, UserLoginDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserAuth {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly crypto: CryptoService
  ) {}

  async login({
    email,
    password,
  }: UserLoginDTO): Promise<{ token: string; user: User } | null> {
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

  async signUp({ fullName, email, password, phone }: UserCreateDTO) {
    if (await this.userRepo.emailExist(email)) {
      //TODO Create a custom Error
      throw Error("Email Exist");
    }
    const hashedPswd = this.crypto.hashPassword(password);

    return await this.userRepo.create({
      fullName,
      email,
      password: hashedPswd,
      phone,
    });
  }
}
