import { Ingredient } from "./Ingredient";

interface CocktailProps {
  id: number;
  name: string;
  instructions: string;
  additionalNotes: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  ingredients: Ingredient[];
}

export class Cocktail {
  id: number;
  name: string;
  instructions: string;
  additionalNotes: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  ingredients: Ingredient[];

  constructor({
    id,
    name,
    instructions,
    additionalNotes,
    is_deleted,
    created_at,
    updated_at,
    ingredients,
  }: CocktailProps) {
    this.id = id;
    this.name = name;
    this.instructions = instructions;
    this.additionalNotes = additionalNotes;
    this.is_deleted = is_deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.ingredients = ingredients;
  }

  markAsDeleted() {
    this.is_deleted = true;
  }
}

export type CocktailCreateDTO = Pick<
  Cocktail,
  "name" | "instructions" | "additionalNotes" | "ingredients"
>;

export type CocktailUpdateDTO = Partial<CocktailCreateDTO>;
