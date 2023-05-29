import { Role, RoleCreateDTO, RoleUpdateDTO } from "./Role";

export interface RoleRepository {
  create(role: RoleCreateDTO): Promise<Role>;
  getList(): Promise<Role[]>;
  findById(id: number): Promise<Role>;
  update(id: number, role: RoleUpdateDTO): Promise<Role>;
  delete(role: Role): Promise<Role>;
  idExist(id: number): Promise<boolean>;
}
