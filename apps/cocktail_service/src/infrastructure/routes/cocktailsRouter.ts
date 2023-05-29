import express from "express";

import { cocktailConroller } from "../dependencies";

const cocktailsRouter = express.Router();

// list: Query by name, ingredient, or ingredients quantity
cocktailsRouter.get(
  "/cocktails",
  cocktailConroller.list.bind(cocktailConroller)
);

// data from body
cocktailsRouter.post(
  "/cocktails",
  cocktailConroller.create.bind(cocktailConroller)
);

// id from query, data from body
cocktailsRouter.patch(
  "/cocktails/:id",
  cocktailConroller.update.bind(cocktailConroller)
);

// id from query
cocktailsRouter.delete(
  "/cocktails/:id",
  cocktailConroller.delete.bind(cocktailConroller)
);

export { cocktailsRouter };
