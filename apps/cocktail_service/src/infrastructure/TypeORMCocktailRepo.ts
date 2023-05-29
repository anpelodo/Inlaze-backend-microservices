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

  constructor(db: DataSource) {
    this.dbCocktail = db.getRepository(CocktailDB);
  }

  async create(cocktail: CocktailCreateDTO): Promise<Cocktail> {
    const dbCocktail = this.dbCocktail.create({
      ...cocktail,
    });

    const { id } = await this.dbCocktail.save(dbCocktail);
    const newCocktail = await this.findById(id);

    return newCocktail;
  }

  async getList(
    sort: CocktailSort = CocktailSort.DESC,
    orderBy: CocktailOrderBy = CocktailOrderBy.CREATED_AT
  ): Promise<Cocktail[]> {
    const list = await this.dbCocktail.find({
      where: {
        is_deleted: false,
      },
      relations: {
        ingredients: true,
      },
    });

    return list.map((cocktail) => new Cocktail(cocktail));
  }

  async update(
    id: number,
    cocktail: Partial<CocktailCreateDTO>
  ): Promise<Cocktail> {
    const dbCocktail = this.dbCocktail.create({ id, ...cocktail });

    await this.dbCocktail.save(dbCocktail);
    const updatedCocktail = await this.findById(id);

    return updatedCocktail;
  }

  async logicDelete(id: number): Promise<Cocktail> {
    const cocktailToDelete = await this.dbCocktail.findOneBy({ id });

    if (!cocktailToDelete) {
      //TODO Create a custom Error
      throw new Error("Cocktail not found");
    }

    cocktailToDelete.is_deleted = true;

    const deletedCocktail = await this.dbCocktail.save(cocktailToDelete);

    return deletedCocktail;
  }

  async findById(id: number): Promise<Cocktail> {
    const result = await this.dbCocktail.findOneOrFail({
      where: {
        id,
        is_deleted: false,
      },
      relations: {
        ingredients: true,
      },
    });

    return new Cocktail(result);
  }
}
