import { NextFunction, Request, Response } from "express";

// interfaces
import IAuthController from "../../interface/controllers/IAuth.controller.interface";

export default class AuthController implements IAuthController {
    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (err) {
            res.status(500).json({
                message: "error occur"
            })
        }
    }
}