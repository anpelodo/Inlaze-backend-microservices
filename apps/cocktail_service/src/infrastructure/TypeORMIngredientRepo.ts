import { DataSource, In, Repository } from "typeorm";

import { Ingredient } from "../domain/Ingredient";
import { IngredientRepository } from "../domain/IngredientRepository";
import { IngredientDB } from "./dbEntities";

export class TypeORMIngredientRepo implements IngredientRepository {
  private dbIngredient: Repository<IngredientDB>;

  constructor(db: DataSource) {
    this.dbIngredient = db.getRepository(IngredientDB);
  }
  async findManyById(ingrId: Pick<Ingredient, "id">[]): Promise<Ingredient[]> {
    const idList = ingrId.map((ing) => ing.id);

    const listIngredients = await this.dbIngredient.findBy({ id: In(idList) });

    return listIngredients.map((ingredient) => new Ingredient(ingredient));
  }
}
