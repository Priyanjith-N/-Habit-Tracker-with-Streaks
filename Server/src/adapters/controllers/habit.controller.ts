import { NextFunction, Response } from "express";

// constants
import { StatusCodes } from "../../constants/statusCode";
import { ResponseMessage } from "../../constants/sucessMessage";

// interfaces
import IAuthRequest from "../../interface/common/IAuthRequest.interface";
import IHabitController from "../../interface/controllers/IHabit.controller.interface";
import IHabit, { IHabitCredentials } from "../../entity/IHabit.entity";
import IHabitUsecase from "../../interface/usecase/habit.usecase.interface";

export default class HabitController implements IHabitController {
    private habitUseCase: IHabitUsecase;

    constructor(habitUseCase: IHabitUsecase) {
        this.habitUseCase = habitUseCase;
    }

    async createHabit(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const habitCredentials: IHabitCredentials = {
                habitName: req.body.habitName,
                description: req.body.description
            }

            const data: IHabit = await this.habitUseCase.createHabit(habitCredentials, req.id!);

            res.status(StatusCodes.Success).json({
                message: ResponseMessage.SUCESSFULL,
                data
            });
        } catch (err: any) {
            next(err);
        }
    }
}