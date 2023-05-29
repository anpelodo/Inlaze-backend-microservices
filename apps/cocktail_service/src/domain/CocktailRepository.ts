import { Cocktail, CocktailCreateDTO, CocktailUpdateDTO } from "./Cocktail";

export interface CocktailRepository {
  create(cocktail: CocktailCreateDTO): Promise<Cocktail>;
  getList(
    sort: CocktailSort,
    orderBy: CocktailOrderBy,
    ingredients?: { id: number }[]
  ): Promise<Cocktail[]>;
  update(id: number, cocktail: CocktailUpdateDTO): Promise<Cocktail>;
  logicDelete(id: number): Promise<Cocktail>;
  findById(id: number): Promise<Cocktail>;
}

export const enum CocktailSort {
  ASC = "ASC",
  DESC = "DESC",
}

export const enum CocktailOrderBy {
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  INGREDIENTS_COUNT = "INGREDIENTS_COUNT ",
}
