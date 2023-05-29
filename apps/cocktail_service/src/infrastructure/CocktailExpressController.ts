import { Request, Response } from "express";
import { logErr } from "logger";

import { CocktailOrderBy, CocktailSort } from "../domain/CocktailRepository";
import { CocktailControllerRestAdapter } from "./CocktailControllerRestAdapter";

export class CocktailExpressController {
  constructor(private readonly cocktailCrud: CocktailControllerRestAdapter) {}

  async list(req: Request, res: Response) {
    const { sort, order_by } = req.query;

    try {
      const list = await this.cocktailCrud.list(
        sort as CocktailSort | undefined,
        order_by as CocktailOrderBy | undefined
      );

      return res.status(200).json(list);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async create(req: Request, res: Response) {
    const { name, instructions, additional_notes, ingredients } = req.body;

    try {
      const newCocktail = await this.cocktailCrud.create({
        name,
        instructions,
        additionalNotes: additional_notes,
        ingredients,
      });

      return res.status(201).json(newCocktail);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, instructions, additional_notes, ingredients } = req.body;

    try {
      const updatedCocktail = await this.cocktailCrud.update(id, {
        name,
        instructions,
        additionalNotes: additional_notes,
        ingredients,
      });

      return res.status(200).json(updatedCocktail);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const deletedCocktail = await this.cocktailCrud.delete(id);

      return res.status(200).json(deletedCocktail);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }
}
