import { CocktailCrud, CocktailInputDTO } from "../application/CocktailCrud";
import { Cocktail, CocktailCreateDTO } from "../domain/Cocktail";
import { CocktailOrderBy, CocktailSort } from "../domain/CocktailRepository";

export class CocktailControllerRestAdapter {
  constructor(private readonly app: CocktailCrud) {}

  async create(props: CocktailInputDTO): Promise<CocktailRest> {
    return this.format(await this.app.create(props));
  }

  async list(
    sort?: CocktailSort,
    orderBy?: CocktailOrderBy,
    ingredients?: { id: number }[] | undefined
  ): Promise<CocktailRest[]> {
    const list = await this.app.list(sort, orderBy, ingredients);

    return list.map((l) => this.format(l));
  }

  async update(
    id: number,
    partial: Partial<CocktailCreateDTO>
  ): Promise<CocktailRest> {
    return this.format(await this.app.update(id, partial));
  }

  async delete(id: number): Promise<CocktailRest> {
    return this.format(await this.app.delete(id));
  }

  private format({
    id,
    name,
    instructions,
    additionalNotes,
    ingredients,
    created_at,
    updated_at,
  }: Cocktail): CocktailRest {
    const formatedCocktail: CocktailRest = {
      id,
      name,
      instructions,
      additionalNotes,
      ingredients,
      created_at,
      updated_at,
    };

    return formatedCocktail;
  }
}

type CocktailRest = Omit<Cocktail, "is_deleted">;
