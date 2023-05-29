import express from "express";

import { roleRouter } from "./roleRouter";

const apiRouter = express.Router();
apiRouter.use(roleRouter);

export { apiRouter };
