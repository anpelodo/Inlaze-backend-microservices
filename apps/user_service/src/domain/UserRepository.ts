import { User, UserCreateDTO, UserUpdateDTO } from "./User";

export interface UserRepository {
  create(user: UserCreateDTO): Promise<User>;
  findById(id: number): Promise<User>;
  findByEmail(id: string): Promise<User>;
  update(user: UserUpdateDTO): Promise<User>;
  delete(user: User): Promise<User>;
}
