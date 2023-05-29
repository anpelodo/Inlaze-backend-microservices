import { Request, Response } from "express";
import { logErr } from "logger";

import { RoleCrud } from "../application/RoleCrud";
import { UserAlreadyExist } from "../domain/UserAlreadyExist";

export class RoleExpressController {
  constructor(private readonly roleCrud: RoleCrud) {}

  async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const newRole = await this.roleCrud.create({ name });

      return res.status(201).json(newRole);
    } catch (err) {
      if (err instanceof UserAlreadyExist) {
        console.log("ya existe");
        return res.status(400).json({ message: "User Already Exist" });
      }

      logErr(err);
      return res.sendStatus(500);
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const list = await this.roleCrud.list();

      return res.status(200).json(list);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    try {
      const roleUpdated = await this.roleCrud.update(id, { name });

      return res.status(200).json(roleUpdated);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const roleDeleted = await this.roleCrud.delete(id);

      return res.status(200).json(roleDeleted);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }
}
