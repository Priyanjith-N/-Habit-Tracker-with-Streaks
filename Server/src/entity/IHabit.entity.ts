export default interface IHabit {
    _id: string;
    habitName: string;
    userId: string;
    description: string;
    datesCompleted: Date[];
    currentStreak: number;
    highestStreak: number;
    lastUpdated: Date | null;
    createdAt: Date;
}

export interface IHabitCredentials {
    habitName: string | undefined;
    description: string | undefined;
}