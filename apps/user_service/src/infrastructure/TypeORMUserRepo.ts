import { DataSource, Repository } from "typeorm";

import { User, UserCreateDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserDB } from "./dbEntities";

export class TypeORMUserRepo implements UserRepository {
  private dbUser: Repository<UserDB>;

  constructor(db: DataSource) {
    this.dbUser = db.getRepository(UserDB);
  }

  async create(user: UserCreateDTO): Promise<User> {
    const userToAdd = this.dbUser.create(user);

    const { id } = await this.dbUser.save(userToAdd);
    const newUser = await this.findById(id);

    return newUser;
  }

  async findById(id: number): Promise<User> {
    const user = await this.dbUser.findOneBy({ id });

    if (!user) {
      //TODO Create a custom Error
      throw new Error("no existe");
    }

    return new User(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.dbUser.findOneBy({ email });

    if (!user) {
      //TODO Create a custom Error
      throw new Error("no existe");
    }

    return new User(user);
  }

  async emailExist(email: string): Promise<boolean> {
    return await this.dbUser.exist({ where: { email } });
  }

  async idExist(id: number): Promise<boolean> {
    return this.dbUser.exist({ where: { id } });
  }

  async update(id: number, user: Partial<UserCreateDTO>): Promise<User> {
    const userToUpdate = this.dbUser.create({ id, ...user });

    await this.dbUser.save(userToUpdate);
    const updatedUser = await this.findById(id);

    return updatedUser;
  }

  async delete(user: User): Promise<User> {
    const userToDelete = this.dbUser.create(user);

    await this.dbUser.delete(userToDelete);

    return user;
  }
}
