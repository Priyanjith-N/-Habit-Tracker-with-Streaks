import mongoose from "mongoose";

// interfaces
import IHabit from "../../entity/IHabit.entity";

const habitSchema = new mongoose.Schema(
    {
        habitName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        datesCompleted: {
            type: [Date],
            default: []
        },
        currentStreak: {
            type: Number,
            default: 0
        },
        highestStreak: {
            type: Number,
            default: 0
        },
        lastUpdated: {
            type: Date,
            default: null
        },
    }, 
    { 
        timestamps: true
    }
);

const Habits = mongoose.model<IHabit>('Habits', habitSchema);

export default Habits;