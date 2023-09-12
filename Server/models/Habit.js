import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const habitSchema = new mongoose.Schema({
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
    /*   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, */
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default model("Habit", habitSchema);







