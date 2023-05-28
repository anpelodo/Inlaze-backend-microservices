import { DataSource, Repository } from "typeorm";

import { Cocktail, CocktailCreateDTO } from "../domain/Cocktail";
import {
  CocktailOrderBy,
  CocktailRepository,
  CocktailSort,
} from "../domain/CocktailRepository";
import { CocktailDB } from "./dbEntities";

export class TypeORMCocktailRepo implements CocktailRepository {
  private dbCocktail: Repository<CocktailDB>;
  // private dbIngredient: Repository<IngredientDB>;

  constructor(db: DataSource) {
    this.dbCocktail = db.getRepository(CocktailDB);
    // this.dbIngredient = db.getRepository(IngredientDB);
  }

  async create(cocktail: CocktailCreateDTO): Promise<Cocktail> {
    const dbCocktail = this.dbCocktail.create({
      ...cocktail,
    });

    const newCocktail = await this.dbCocktail.save(dbCocktail);

    return new Cocktail(newCocktail);
  }

  async getList(
    sort: CocktailSort = CocktailSort.DESC,
    orderBy: CocktailOrderBy = CocktailOrderBy.CREATED_AT
  ): Promise<Cocktail[]> {
    const list = await this.dbCocktail.find({
      where: {
        is_deleted: false,
      },
    });

    return list.map((cocktail) => new Cocktail(cocktail));
  }

  async update(
    id: number,
    cocktail: Partial<CocktailCreateDTO>
  ): Promise<Cocktail> {
    const dbCocktail = this.dbCocktail.create({ id, ...cocktail });

    const updatedCocktail = await this.dbCocktail.save(dbCocktail);

    return new Cocktail(updatedCocktail);
  }

  async logicDelete(id: number): Promise<Cocktail> {
    const cocktailToDelete = await this.dbCocktail.findOneBy({ id });

    if (!cocktailToDelete) {
      //TODO Create a custom Error
      throw new Error("Cocktail not found");
    }

    cocktailToDelete.is_deleted = true;

    const deletedCocktail = await this.dbCocktail.save(cocktailToDelete);

    return new Cocktail(deletedCocktail);
  }
}
