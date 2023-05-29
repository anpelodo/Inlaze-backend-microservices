import { Role, RoleCreateDTO, RoleUpdateDTO } from "../domain/Role";
import { RoleRepository } from "../domain/RoleRepository";

export class RoleCrud {
  constructor(private readonly roleRepo: RoleRepository) {}

  async create(role: RoleCreateDTO): Promise<Role> {
    return this.roleRepo.create(role);
  }

  async list(): Promise<Role[]> {
    return this.roleRepo.getList();
  }

  async findById(id: number): Promise<Role> {
    return this.roleRepo.findById(id);
  }

  async update(id: number, partial: RoleUpdateDTO): Promise<Role> {
    if (!(await this.roleRepo.idExist(id))) {
      //TODO Create a custom Error
      throw new Error("no existe");
    }

    const roleUpdated = await this.roleRepo.update(id, partial);

    return roleUpdated;
  }

  async delete(id: number): Promise<Role> {
    const roleToDelete = await this.roleRepo.findById(id);

    await this.roleRepo.delete(roleToDelete);

    return roleToDelete;
  }
}
