/* eslint-disable @typescript-eslint/no-unused-vars */
import { CocktailCrud } from "../application/CocktailCrud";
import { CocktailControllerRestAdapter } from "./CocktailControllerRestAdapter";
import { CocktailExpressController } from "./CocktailExpressController";
import { AppDataSource } from "./configs";
import { TypeORMCocktailRepo } from "./TypeORMCocktailRepo";
import { TypeORMIngredientRepo } from "./TypeORMIngredientRepo";

const cocktailRepo = new TypeORMCocktailRepo(AppDataSource);
const ingredintRepo = new TypeORMIngredientRepo(AppDataSource);

const cocktailCrud = new CocktailCrud(cocktailRepo, ingredintRepo);
const cocktailAdapter = new CocktailControllerRestAdapter(cocktailCrud);

export const cocktailConroller = new CocktailExpressController(cocktailAdapter);
