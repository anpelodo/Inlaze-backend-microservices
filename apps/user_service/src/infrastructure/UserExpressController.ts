import { Request, Response } from "express";
import { logErr } from "logger";

import { UserAuth } from "../application/UserAuth";
import { UserCrud } from "../application/UserCrud";

export class UserExpressController {
  constructor(
    private readonly userAuth: UserAuth,
    private readonly userCrud: UserCrud
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await this.userAuth.login({ email, password });

      if (!result) {
        return res.status(401).json({ message: "email or password not valid" });
      }

      const { user, token } = result;

      return res
        .status(200)
        .setHeader("Cache-Control", "no-store")
        .json({ user, ...token });
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async signUp(req: Request, res: Response) {
    const { fullName, email, password, phone } = req.body;

    try {
      const { user, token } = await this.userAuth.signUp({
        fullName,
        email,
        password,
        phone,
      });

      return res
        .status(201)
        .setHeader("Cache-Control", "no-store")
        .json({ user, ...token });
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { fullName, email, password, phone } = req.body;

    try {
      const updatedUser = await this.userCrud.update(id, {
        fullName,
        email,
        password,
        phone,
      });

      return res.status(200).json(updatedUser);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const userDeleted = await this.userCrud.delete(id);

      return res.status(200).json(userDeleted);
    } catch (err) {
      logErr(err);
      return res.sendStatus(500);
    }
  }
}
