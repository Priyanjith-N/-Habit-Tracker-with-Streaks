// importing collections
import Habits from "../../framework/models/habit.model";

// interfaces
import IHabitRepository from "../../interface/repositories/IHabit.repository.interface";
import IHabit from "../../entity/IHabit.entity";

export default class HabitRepository implements IHabitRepository {
    async isHabitExisist(habitName: string, userId: string): Promise<IHabit | null | never> {
        try {
            return await Habits.findOne({ habitName: { $regex: new RegExp(`^${habitName}$`, 'i') } }, { userId });
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
}