import express from "express";

import { cocktailsRouter } from "./cocktailsRouter";

const apiRouter = express.Router();

apiRouter.use(cocktailsRouter);

export { apiRouter };
