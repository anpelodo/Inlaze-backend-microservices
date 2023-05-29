import { RoleCrud } from "../application/RoleCrud";
import { UserAuth } from "../application/UserAuth";
import { UserCrud } from "../application/UserCrud";
import { AppDataSource } from "./configs";
import { CryptoServiceStub } from "./CryptoServiceStub";
import { RoleExpressController } from "./RoleExpressController";
import { TypeORMRoleRepo } from "./TypeORMRoleRepo";
import { TypeORMUserRepo } from "./TypeORMUserRepo";
import { UserExpressController } from "./UserExpressController";

const roleRepo = new TypeORMRoleRepo(AppDataSource);
const userRepo = new TypeORMUserRepo(AppDataSource);

const cryptoService = new CryptoServiceStub();
const userAuth = new UserAuth(userRepo, cryptoService);
const userCrud = new UserCrud(userRepo);
const roleCrud = new RoleCrud(roleRepo);

export const userController = new UserExpressController(userAuth, userCrud);
export const roleController = new RoleExpressController(roleCrud);
