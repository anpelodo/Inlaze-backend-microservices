import { RoleCrud } from "../application/RoleCrud";
import { AppDataSource } from "./configs";
import { RoleExpressController } from "./RoleExpressController";
import { TypeORMRoleRepo } from "./TypeORMRoleRepo";

const roleRepo = new TypeORMRoleRepo(AppDataSource);
const roleCrud = new RoleCrud(roleRepo);

export const roleController = new RoleExpressController(roleCrud);
