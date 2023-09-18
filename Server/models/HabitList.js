
import { Schema, model } from "mongoose";
const habitSchema = new Schema({
    habitList: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            frequency: {
                type: String,
                enum: ["daily", "weekly", "monthly"],
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
export default model("HabitList", habitSchema);
