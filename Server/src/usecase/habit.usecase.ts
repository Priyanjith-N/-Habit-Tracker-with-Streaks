// custom error classes
import RequiredCredentialsNotGiven from "../errors/requiredCredentialsNotGiven.error";
import ValidationError from "../errors/validationErrorDetails.error";

// constants
import { ErrorCode } from "../constants/customStatusErrorCode";
import { ErrorMessage } from "../constants/errorMesaage";
import { StatusCodes } from "../constants/statusCode";
import { ErrorField } from "../constants/errorField";

// interfaces
import IHabit, { IHabitCredentials } from "../entity/IHabit.entity";
import IHabitUsecase from "../interface/usecase/habit.usecase.interface";
import IHabitRepository from "../interface/repositories/IHabit.repository.interface";

export default class HabitUseCase implements IHabitUsecase {
    private habitRepository: IHabitRepository;

    constructor(habitRepository: IHabitRepository) {
        this.habitRepository = habitRepository;
    }

    async createHabit(habitCredentials: IHabitCredentials, userId: string): Promise<IHabit | never> {
        try {
            if(!habitCredentials || !habitCredentials.habitName) throw new RequiredCredentialsNotGiven(ErrorMessage.REQUIRED_CREDENTIALS_NOT_GIVEN, ErrorCode.CREDENTIALS_NOT_GIVEN_OR_NOT_FOUND);

            const isHabitExisist = await this.habitRepository.isHabitExisist(habitCredentials.habitName, userId);

            if(isHabitExisist) {
                throw new ValidationError({
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.HABITNAME,
                    message: ErrorMessage.HABIT_ALREADY_INLIST,
                    errorCode: ErrorCode.HABIT_ALREADY_INLIST
                });
            }

            habitCredentials.description = habitCredentials.description ? habitCredentials.description : "";

            // save new habit in db
            const newHabit: IHabit = await this.habitRepository.saveNewHabit(habitCredentials.habitName, habitCredentials.description, userId);

            return newHabit;
        } catch (err: any) {
            throw err;
        }
    }

    async getAllHabitsOfUser(userId: string): Promise<IHabit[] | never> {
        try {
            const habits: IHabit[] = await this.habitRepository.getAllHabitsOfUser(userId);

            // check if the current streak is consistent

            for(const habit of habits) {
                if(!habit.lastUpdated) continue; // current streak no need update
                
                const today: Date = new Date();
                const lastUpdatedDate: string = habit.lastUpdated.toISOString().split("T")[0];

                if(lastUpdatedDate === today.toISOString().split("T")[0]) continue;

                const yesterDay = new Date();
                
                yesterDay.setDate(today.getDate() - 1);

                if(lastUpdatedDate === yesterDay.toISOString().split("T")[0]) continue;

                // if the last updated Date is not yesterday or today that mean he or she had skiped one or more day need to reset the current streak to 0

                habit.currentStreak = 0;

                await this.habitRepository.resetCurrentStreakOfHabit(habit._id);
            }

            return habits;
        } catch (err: any) {
            throw err;
        }
    }
}