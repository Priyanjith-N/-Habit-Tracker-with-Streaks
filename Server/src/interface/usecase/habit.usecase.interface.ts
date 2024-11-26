// interfaces
import IHabit, { IHabitCredentials } from "../../entity/IHabit.entity";

export default interface IHabitUsecase {
    createHabit(habitCredentials: IHabitCredentials, userId: string): Promise<IHabit | never>;
    getAllHabitsOfUser(userId: string): Promise<IHabit[] | never>;
}