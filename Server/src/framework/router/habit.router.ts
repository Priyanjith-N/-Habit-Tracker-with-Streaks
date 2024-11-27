import { Router } from "express";

//interfaces
import IJWTService from "../../interface/utils/IJWTService";
import IHabitRepository from "../../interface/repositories/IHabit.repository.interface";
import IHabitUsecase from "../../interface/usecase/habit.usecase.interface";
import IHabitController from "../../interface/controllers/IHabit.controller.interface";
import IAuthMiddleware from "../../interface/middlewares/authMiddleware.interface";

// classes importing
import HabitRepository from "../../adapters/repositories/habit.repository";
import HabitUseCase from "../../usecase/habit.usecase";
import HabitController from "../../adapters/controllers/habit.controller";
import AuthMiddleware from "../middleware/auth.middleware";

// importing util services
import JWTService from "../utils/jwtService.utils";

// util services
const jwtService: IJWTService = new JWTService();

// auth middleware
const authMiddleware: IAuthMiddleware = new AuthMiddleware(jwtService);

const habitRepository: IHabitRepository = new HabitRepository();
const habitUsecase: IHabitUsecase = new HabitUseCase(habitRepository);
const habitController: IHabitController = new HabitController(habitUsecase);

const habitRouter: Router = Router();

habitRouter.use(authMiddleware.isAuthenticate.bind(authMiddleware));

habitRouter.route("/habit").
    post(habitController.createHabit.bind(habitController)).
    get(habitController.getAllHabitsOfUser.bind(habitController));

habitRouter.route("/habit/:habitId").
    patch(habitController.logHabitCompletion.bind(habitController)).
    get(habitController.getHabitData.bind(habitController));

export default habitRouter;