
// Import necessary modules
import { Schema, model } from "mongoose";

//^ schema for the HabitList collection
const habitSchema = new Schema({

    // field named "habitList" which is an array of objects
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
                //enum: ["daily", "weekly", "monthly"],
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            progress: {
                type: Number, 
                min: 0,
                max: 30,
                default: 0
            },
        },
    ],
});
export default model("HabitList", habitSchema);

//* Password Comparison Method: The schema defines a method called correctPassword, which is used to compare a provided password with the user's stored password hash. This is a useful method for verifying user credentials during authentication.

//* Mongoose Model: The code creates a Mongoose model named "User" using the defined schema. This model can be used to interact with the "User" collection in the database, including creating, updating, and querying user data.

//* Frontend developers please refer to these comments to understand the structure and validation rules for user data in the backend database. Additionally, note the presence of the correctPassword method, which can be used for password validation during user login or authentication processes in frontend applications.