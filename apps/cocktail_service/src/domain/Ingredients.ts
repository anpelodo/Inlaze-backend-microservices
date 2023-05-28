interface IngredientProps {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class Ingredient {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor({ id, name, created_at, updated_at }: IngredientProps) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
