import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


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

    userSchema.methods.correctPassword = async function (
        inputPassword,
        userPassword
  ) {
    return await bcrypt.compare(inputPassword, userPassword);
  };

export default model("User", userSchema);

