export default interface IHabit {
    _id: string;
    habitName: string;
    userId: string;
    description: string;
    datesCompleted: Date[];
    currentStreak: number;
    highestStreak: number;
    lastUpdated: Date | null;
}

export interface IHabitCredentials {
    habitName: string;
    description: string;
}

export interface IHabitWithCompletionStatus extends IHabit {
    completedToday: boolean;
}