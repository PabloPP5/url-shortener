import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { redirectRouter, urlsRouter } from "./modules/urls/urls.routes";


export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/urls", urlsRouter);
app.use(redirectRouter);
app.use(errorHandler);