import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    habitListId: {
        type: Schema.Types.ObjectId,
        ref: "HabitList",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default model("User", userSchema);









