import { NextFunction, Request, Response } from "express";

export default interface IAuthController {
    registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}