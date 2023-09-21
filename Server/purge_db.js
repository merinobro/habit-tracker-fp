import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import HabitLists from "./models/HabitList.js";
import Habit from "./models/Habit.js";
dotenv.config();

// Connect to the MongoDB database
(async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

         // Purge data from the User collection
        await User.deleteMany();
        console.log("Users purged");

        // Purge data from the HabitLists collection
        await HabitLists.deleteMany();
        console.log("Lists purged"); 

        // Purge data from the Habit collection
        await Habit.deleteMany();
        console.log("Habits purged");
    } catch (error) {
        console.error("Error while purging data:", error);
    } finally {

        // Close the MongoDB connection
        mongoose.connection.close();
    }
})();
