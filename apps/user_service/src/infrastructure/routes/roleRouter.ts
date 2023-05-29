import { Router } from "express";

import { roleController } from "../dependencies";

const roleRouter = Router();

roleRouter.post("/roles", roleController.create.bind(roleController));
roleRouter.get("/roles", roleController.list.bind(roleController));
roleRouter.patch("/roles/:id", roleController.update.bind(roleController));
roleRouter.delete("/roles/:id", roleController.delete.bind(roleController));

export { roleRouter };
