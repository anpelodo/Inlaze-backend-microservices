import { User, UserUpdateDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserCrud {
  constructor(private readonly userRepo: UserRepository) {}

  async update(id: number, partial: UserUpdateDTO): Promise<User> {
    if (!(await this.userRepo.idExist(id))) {
      //TODO Create a custom Error
      throw new Error("no existe");
    }

    const userUpdated = await this.userRepo.update(id, partial);

    return userUpdated;
  }

  async delete(id: number): Promise<User> {
    const userToDelete = await this.userRepo.findById(id);

    await this.userRepo.delete(userToDelete);

    return userToDelete;
  }
}
