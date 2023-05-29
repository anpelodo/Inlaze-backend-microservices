import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { RoleDB } from "./RoleDB";

@Entity({ name: "users" })
export class UserDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "full_name", length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToOne(() => RoleDB, (role: RoleDB) => role.user)
  role: RoleDB;
}
