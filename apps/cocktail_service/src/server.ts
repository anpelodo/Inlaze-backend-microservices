import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { AppDataSource, config } from "./infrastructure/configs";
import { apiRouter } from "./infrastructure/routes";

export const createServer = async () => {
  const app = express();

  await AppDataSource.initialize();

  app
    .set("port", config.port)
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api/v1", apiRouter)
    .get("/health", (_req, res) => {
      return res.json({ ok: true, service: "cocktail Service" });
    });

  return app;
};
