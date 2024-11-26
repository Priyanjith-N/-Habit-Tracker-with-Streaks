import { NextFunction, Request, Response } from "express";

// interfaces
import IAuthRequest from "../common/IAuthRequest.interface";

export default interface IAuthController {
    registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    logoutUser(req: IAuthRequest, res: Response, next: NextFunction): Promise<void>;
}