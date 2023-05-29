import { User, UserCreateDTO, UserUpdateDTO } from "./User";

export interface UserRepository {
  create(user: UserCreateDTO): Promise<User>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  emailExist(email: string): Promise<boolean>;
  update(id: number, user: UserUpdateDTO): Promise<User>;
  delete(user: User): Promise<User>;
}
