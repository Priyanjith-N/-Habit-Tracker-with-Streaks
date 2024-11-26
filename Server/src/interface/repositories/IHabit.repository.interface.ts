// interfaces
import IHabit from "../../entity/IHabit.entity";

export default interface IHabitRepository {
    isHabitExisist(habitName: string, userId: string): Promise<IHabit | null | never>;
    saveNewHabit(habitName: string, description: string, userId: string): Promise<IHabit | never>;
    getAllHabitsOfUser(userId: string): Promise<IHabit[] | never>;
    resetCurrentStreakOfHabit(habitId: string): Promise<void | never>;
    getHabitByHabitIdAndUserId(habitId: string, userId: string): Promise<IHabit | null | never>;
    updateCompletionLogForHabit(habitId: string, currentDate: Date, currentStreak: number, highestStreak: number): Promise<IHabit | never>;
}