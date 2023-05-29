import { Request, Response } from "express";

import { CocktailControllerRestAdapter } from "./CocktailControllerRestAdapter";

export class CocktailExpressController {
  constructor(private readonly cocktailCrud: CocktailControllerRestAdapter) {}

  async list(req: Request, res: Response) {
    try {
      const list = await this.cocktailCrud.list();

      return res.status(200).json(list);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      return res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
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
      console.error(err);
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);

    try {
      const deletedCocktail = await this.cocktailCrud.delete(id);

      return res.status(200).json(deletedCocktail);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
}
