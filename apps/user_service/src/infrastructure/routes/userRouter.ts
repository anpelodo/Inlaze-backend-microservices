import { Router } from "express";

import { userController } from "../dependencies";

const userRouter = Router();

userRouter.post("/login", userController.login.bind(userController));
userRouter.post("/signup", userController.signUp.bind(userController));
userRouter.patch("/users/:id", userController.update.bind(userController));
userRouter.delete("/users/:id", userController.delete.bind(userController));

export { userRouter };
