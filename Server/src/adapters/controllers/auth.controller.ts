import { NextFunction, Request, Response } from "express";

// constants
import { ResponseMessage } from "../../constants/sucessMessage";
import { StatusCodes } from "../../constants/statusCode";

// interfaces
import IAuthController from "../../interface/controllers/IAuth.controller.interface";
import { ILoginCredentials, IRegisterationCredentials } from "../../entity/IUser.entity";
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface";
import IAuthRequest from "../../interface/common/IAuthRequest.interface";

export default class AuthController implements IAuthController {
    private authUseCase: IAuthUseCase;

    constructor(authUseCase: IAuthUseCase) {
        this.authUseCase = authUseCase;
    }

    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const registerationCredentials: IRegisterationCredentials = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }

            const token: string = await this.authUseCase.handelUserRegister(registerationCredentials);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1 * 24 * 60 * 60 * 1000
            });

            res.status(StatusCodes.Success).json({
                message: ResponseMessage.REGISTERTATION_SUCCESS
            });
        } catch (err) {
            next(err);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userLoginCredentials: ILoginCredentials = {
                email: req.body.email,
                password: req.body.password,
            }

            const token: string = await this.authUseCase.handelUserLogin(userLoginCredentials);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1 * 24 * 60 * 60 * 1000
            });

            res.status(StatusCodes.Success).json({
                message: ResponseMessage.LOGIN_SUCCESS
            });
        } catch (err: any) {
            next(err);
        }
    }

    async logoutUser(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            res.status(StatusCodes.Success).json({
                message: ResponseMessage.LOGOUT_SUCCESS
            });
        } catch (err: any) {
            next(err);
        }
    }
}