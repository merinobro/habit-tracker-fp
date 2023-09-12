import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import HabitLists from "./models/HabitList.js";
import Habit from "./models/Habit.js";
dotenv.config();
(async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        await User.deleteMany();
        console.log("Users purged");
        await HabitLists.deleteMany();
        console.log("Lists purged");
        await Habit.deleteMany();
        console.log("Habits purged");
    } catch (error) {
        console.error("Error while purging data:", error);
    } finally {
        mongoose.connection.close();
    }
})();







