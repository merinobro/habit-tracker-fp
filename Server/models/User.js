
// Import necessary modules
import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

//^ schema for the User collection
const userSchema = new mongoose.Schema({

    //! User's username (required)
    username: {
        type: String,
        required: true,
    },
    //! User's email (unique and required)
    email: {
        type: String,
        unique: true,
        required: true,
    },
    //! User's password (required)
    password: {
        type: String,
        required: true,
    },
    //! Reference to the associated HabitList using its ObjectId
    habitListId: {
        type: Schema.Types.ObjectId,
        ref: "HabitList",
    },
    //! Timestamp for user creation (defaults to the current date and time)
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to compare a provided password with the user's stored password hash
    userSchema.methods.correctPassword = async function (
        inputPassword,
        userPassword
  ) {

    // Use bcrypt to compare the input password with the stored password hash
    return await bcrypt.compare(inputPassword, userPassword);
  };

export default model("User", userSchema);

//* Data Structure Understanding: The schema definition helps frontend developers understand the structure of user data in the backend. They can use this information to create forms, input fields, and data models on the frontend that match the expected data format on the server.

//* API Endpoint Integration: Frontend developers can utilize this schema to understand the expected data fields when making requests to API endpoints related to user data. This includes registration, login, and other user-related actions.

//* Validation Rules: The schema definition includes validation rules, such as required fields (e.g., username, email, password) and uniqueness constraints (e.g., unique email). Frontend developers should ensure that user inputs adhere to these rules before making requests to the backend to prevent errors and ensure data integrity.

//* Password Handling: The code provides a correctPassword method for comparing a provided password with the stored hashed password. Frontend developers can use this method to implement secure user authentication on the frontend when users log in.

//* Model Usage: Frontend developers can create instances of the "User" model based on this schema to prepare and format user data before sending it to the backend or displaying it on the frontend. This ensures consistency between the frontend and backend representations of user data.

//* Data Integrity: Understanding the schema helps frontend developers ensure data integrity. They can avoid sending incomplete or invalid data to the backend, reducing the likelihood of errors.

//* Timestamps: The schema includes a timestamp for when the user was created. Frontend developers can use this information for displaying user registration dates or other time-related data on the frontend.

//* Security Awareness: The presence of bcrypt for password hashing serves as a reminder of the importance of password security. Frontend developers can collaborate with backend developers to ensure secure password handling and storage practices.

//* Debugging: In case of errors or issues related to user data, frontend developers can refer to the schema definition to understand the expected data structure and constraints. This aids in debugging and resolving issues efficiently.

