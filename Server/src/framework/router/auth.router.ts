import { Router } from "express";

//interfaces
import IHashingService from "../../interface/utils/IHashingService";
import IJWTService from "../../interface/utils/IJWTService";
import IAuthRepository from "../../interface/repositories/IAuth.repository.interface";
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface";
import IAuthController from "../../interface/controllers/IAuth.controller.interface";

// classes importing
import AuthRepository from "../../adapters/repositories/auth.repository";
import AuthUseCase from "../../usecase/auth.usecase";
import AuthController from "../../adapters/controllers/auth.controller";

// importing util services
import HashingService from "../utils/hashingService.utils";
import JWTService from "../utils/jwtService.utils";

// util services
const hashingService: IHashingService = new HashingService();
const jwtService: IJWTService = new JWTService();

const authRepository: IAuthRepository = new AuthRepository();
const authUseCase: IAuthUseCase = new AuthUseCase(authRepository, hashingService, jwtService);
const authController: IAuthController = new AuthController(authUseCase);

const authRouter: Router = Router();

authRouter.route("/register").post(authController.registerUser.bind(authController));

authRouter.route("/login").post(authController.loginUser.bind(authController));

export default authRouter;