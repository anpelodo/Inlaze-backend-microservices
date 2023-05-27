import "reflect-metadata";

import { DataSource } from "typeorm";

import { RoleDB, UserDB } from "../dbEntities";
import { config } from "./loadEnv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  entities: [RoleDB, UserDB],
  synchronize: true,
  logging: false,
});
