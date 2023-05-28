import { Ingredient } from "./Ingredient";

export interface IngredientRepository {
  findManyById(ids: Pick<Ingredient, "id">[]): Promise<Ingredient[]>;
}
