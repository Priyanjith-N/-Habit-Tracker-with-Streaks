import { NextFunction, Response } from "express";

// interfaces
import IAuthRequest from "../common/IAuthRequest.interface";

export default interface IHabitController {
    createHabit(req: IAuthRequest, res: Response, next: NextFunction): Promise<void>;
    getAllHabitsOfUser(req: IAuthRequest, res: Response, next: NextFunction): Promise<void>;
}