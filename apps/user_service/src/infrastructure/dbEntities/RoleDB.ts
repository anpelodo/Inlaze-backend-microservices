import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { UserDB } from "./UserDB";

@Entity({ name: "users" })
export class RoleDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToOne(() => UserDB, (user: UserDB) => user.role)
  @JoinColumn()
  user: UserDB;
}
