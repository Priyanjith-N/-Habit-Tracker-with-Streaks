// importing collections
import Habits from "../../framework/models/habit.model";

// interfaces
import IHabitRepository from "../../interface/repositories/IHabit.repository.interface";
import IHabit from "../../entity/IHabit.entity";

export default class HabitRepository implements IHabitRepository {
    async isHabitExisist(habitName: string, userId: string): Promise<IHabit | null | never> {
        try {
            return await Habits.findOne({ habitName: { $regex: new RegExp(`^${habitName}$`, 'i') }, userId });
        } catch (err: any) {
            throw err;
        }
    }

    async saveNewHabit(habitName: string, description: string, userId: string): Promise<IHabit | never> {
        try {
            const newHabit = new Habits({
                habitName,
                userId,
                description
            });

            await newHabit.save();

            return newHabit;
        } catch (err: any) {
            throw err;
        }
    }

    async getAllHabitsOfUser(userId: string): Promise<IHabit[] | never> {
        try {
            return await Habits.find({ userId });
        } catch (err: any) {
            throw err;
        }
    }

    async resetCurrentStreakOfHabit(habitId: string): Promise<void | never> {
        try {
            await Habits.updateOne({ _id: habitId }, { $set: { currentStreak: 0 } });
        } catch (err: any) {
            throw err;
        }
    }

    async getHabitByHabitIdAndUserId(habitId: string, userId: string): Promise<IHabit | null | never> {
        try {
            return await Habits.findOne({ _id: habitId, userId });
        } catch (err: any) {
            throw err;
        }
    }

    async updateCompletionLogForHabit(habitId: string, currentDate: Date, currentStreak: number, highestStreak: number): Promise<IHabit | never> {
        return (await Habits.findOneAndUpdate({ _id: habitId }, { $addToSet: { datesCompleted: currentDate }, $set: { lastUpdated: currentDate, currentStreak, highestStreak } }, { new: true }))!;
    }
}