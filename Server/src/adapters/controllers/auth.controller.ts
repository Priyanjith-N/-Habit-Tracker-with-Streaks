import { NextFunction, Request, Response } from "express";

// constants
import { ResponseMessage } from "../../constants/sucessMessage";
import { StatusCodes } from "../../constants/statusCode";

// interfaces
import IAuthController from "../../interface/controllers/IAuth.controller.interface";
import { IRegisterationCredentials } from "../../entity/IUser.entity";

export default class AuthController implements IAuthController {
    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const registerationCredentials: IRegisterationCredentials = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }

            // usecase logic

            res.status(StatusCodes.Success).json({
                message: ResponseMessage.REGISTERTATION_SUCCESS
            });
        } catch (err) {
            next(err);
        }
    }
}