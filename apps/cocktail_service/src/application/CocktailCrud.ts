import {
  Cocktail,
  CocktailCreateDTO,
  CocktailUpdateDTO,
} from "../domain/Cocktail";
import {
  CocktailOrderBy,
  CocktailRepository,
  CocktailSort,
} from "../domain/CocktailRepository";
import { IngredientRepository } from "../domain/IngredientRepository";
import { Ingredient, IngredientFindableDTO } from "../domain/Ingredient";

export class CocktailCrud {
  constructor(
    private readonly cocktailRepo: CocktailRepository,
    private readonly ingredientRepo: IngredientRepository
  ) {}

  async create({
    name,
    instructions,
    additionalNotes,
    ingredients,
  }: CocktailInputDTO): Promise<Cocktail> {
    let ingredientsList: Ingredient[] = [];

    if (ingredients.length > 0) {
      ingredientsList = await this.ingredientRepo.findManyById(ingredients);
    }

    return await this.cocktailRepo.create({
      name,
      instructions,
      additionalNotes,
      ingredients: ingredientsList,
    });
  }

  async list(
    sort: CocktailSort = CocktailSort.DESC,
    orderBy: CocktailOrderBy = CocktailOrderBy.CREATED_AT,
    ingredients?: { id: number }[]
  ): Promise<Cocktail[]> {
    return await this.cocktailRepo.getList(sort, orderBy, ingredients);
  }

  async update(id: number, partial: CocktailUpdateDTO): Promise<Cocktail> {
    return await this.cocktailRepo.update(id, partial);
  }

  async delete(id: number): Promise<Cocktail> {
    return await this.cocktailRepo.logicDelete(id);
  }
}

export interface CocktailInputDTO
  extends Omit<CocktailCreateDTO, "ingredients"> {
  ingredients: IngredientFindableDTO[];
}
