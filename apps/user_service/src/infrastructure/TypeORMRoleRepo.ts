import { DataSource, Repository } from "typeorm";

import { NotFoundError } from "../domain/NotFoundError";
import { Role, RoleCreateDTO } from "../domain/Role";
import { RoleRepository } from "../domain/RoleRepository";
import { RoleDB } from "./dbEntities";

export class TypeORMRoleRepo implements RoleRepository {
  private dbRole: Repository<RoleDB>;

  constructor(db: DataSource) {
    this.dbRole = db.getRepository(RoleDB);
  }
  async create(role: RoleCreateDTO): Promise<Role> {
    const dbRole = this.dbRole.create(role);

    const { id } = await this.dbRole.save(dbRole);
    const newRole = await this.findById(id);

    return newRole;
  }

  async getList(): Promise<Role[]> {
    const list = await this.dbRole.find();

    return list.map((role) => new Role(role));
  }

  async findById(id: number): Promise<Role> {
    const role = await this.dbRole.findOneBy({ id });

    if (!role) {
      throw new NotFoundError("Role Repo: findById");
    }

    return new Role(role);
  }

  async update(id: number, role: Partial<RoleCreateDTO>): Promise<Role> {
    const roleToUpdate = this.dbRole.create({ id, ...role });

    await this.dbRole.save(roleToUpdate);
    const updatedRole = await this.findById(id);

    return updatedRole;
  }

  async delete(role: Role): Promise<Role> {
    const roleToDelete = this.dbRole.create(role);

    await this.dbRole.delete(roleToDelete);

    return role;
  }

  async idExist(id: number): Promise<boolean> {
    return this.dbRole.exist({ where: { id } });
  }
}
