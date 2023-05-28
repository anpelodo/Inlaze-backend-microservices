import { Ingredient } from "./Ingredients";

export interface IngredientRepository {
  findManyById(ids: Pick<Ingredient, "id">[]): Promise<Ingredient[]>;
}
