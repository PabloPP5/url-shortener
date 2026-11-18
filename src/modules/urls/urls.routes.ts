import { Router } from "express";
import { urlsController } from "./urls.controller";

export const urlsRouter = Router();
export const redirectRouter = Router();

redirectRouter.get("/:shortCode", urlsController.redirect);
urlsRouter.post("/", urlsController.create);
urlsRouter.get("/", urlsController.findAll);
urlsRouter.get("/:shortCode", urlsController.findOne);
urlsRouter.delete("/:shortCode", urlsController.remove);