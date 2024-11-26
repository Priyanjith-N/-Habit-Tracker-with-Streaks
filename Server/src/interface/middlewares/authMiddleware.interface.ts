import { NextFunction, Request, Response } from "express";

// interface
import IAuthRequest from "../common/IAuthRequest.interface";

export default interface IAuthMiddleware {
    isAuthenticate(req: IAuthRequest, res: Response, next: NextFunction): Promise<void>;
}