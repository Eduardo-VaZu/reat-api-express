import type { Request, Response } from "express";

export const healthController = {
    async checkHealth(req: Request, res: Response) {
        res.status(200).json({ message: 'Healthy' });
    },
};