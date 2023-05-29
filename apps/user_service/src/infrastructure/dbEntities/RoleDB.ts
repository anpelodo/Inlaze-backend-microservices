import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserDB } from "./UserDB";

@Entity({ name: "roles" })
export class RoleDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => UserDB, (user: UserDB) => user.role)
  user: UserDB;
}
