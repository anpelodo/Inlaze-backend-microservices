import express, { Request, Response } from "express";

const cocktailsRouter = express.Router();

// TODO delete, only for developing
const tempController = (req: Request, res: Response) => {
  const { params, query, body } = req;

  return res.status(200).json({
    query,
    params,
    body,
  });
};

cocktailsRouter.get("/cocktails", tempController); // list: Query by name, ingredient, or ingredients quantity
cocktailsRouter.post("/cocktails", tempController); // data from body
cocktailsRouter.patch("/cocktails/:id", tempController); // id from query, data from body

export { cocktailsRouter };
