import type { Request, Response } from "express";
import { createUrlSchema, shortCodeParamSchema } from "./urls.dto";
import { urlsService } from "./urls.service";

export const urlsController = {
    async create(req: Request, res: Response) {
        const data = createUrlSchema.parse(req.body);
        const result = await urlsService.create(data);
        res.status(201).json(result);
    },
    async redirect(req: Request, res: Response) {
        const { shortCode } = shortCodeParamSchema.parse(req.params);
        const originalUrl = await urlsService.resolve(shortCode);
        res.redirect(302, originalUrl);
    },
    async findOne(req: Request, res: Response) {
        const { shortCode } = shortCodeParamSchema.parse(req.params);
        const result = await urlsService.findOne(shortCode);
        res.json(result);
    },

    async findAll(_req: Request, res: Response) {
        const result = await urlsService.findAll();
        res.json(result);
    },

    async remove(req: Request, res: Response) {
        const { shortCode } = shortCodeParamSchema.parse(req.params);
        await urlsService.remove(shortCode);
        res.status(204).send();
    },
};