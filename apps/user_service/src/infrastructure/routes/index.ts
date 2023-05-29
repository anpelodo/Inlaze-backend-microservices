import express from "express";

import { roleRouter } from "./roleRouter";
import { userRouter } from "./userRouter";

const apiRouter = express.Router();

apiRouter.use(roleRouter);
apiRouter.use(userRouter);

export { apiRouter };
