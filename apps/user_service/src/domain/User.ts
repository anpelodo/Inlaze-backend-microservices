import { Role } from "./Role";

export interface UserProps {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export class User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    fullName,
    email,
    password,
    phone,
    is_deleted,
    created_at,
    updated_at,
  }: UserProps) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.is_deleted = is_deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export type UserWithRole = User & { role: Role };

export type UserCreateDTO = Pick<
  UserProps,
  "fullName" | "email" | "password" | "phone"
>;

export type UserUpdateDTO = Partial<UserCreateDTO>;
