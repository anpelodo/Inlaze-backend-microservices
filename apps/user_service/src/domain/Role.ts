export interface RoleProps {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor({ id, name, created_at, updated_at }: RoleProps) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export type RoleCreateDTO = Pick<RoleProps, "name">;
export type RoleUpdateDTO = Partial<RoleCreateDTO>;
