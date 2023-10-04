
// Import User model and bcrypt for password hashing
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Function to change the user's password
export const changePassword = async (req, res, next) => {
    try {
         // Destructure currentPassword and newPassword from the request body
        const { currentPassword, newPassword } = req.body;

          // Get the user object from the request
        const { user } = req;

        // Check if the provided current password matches the user's current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            // If the current password is incorrect, send a 401 Unauthorized response
            return res.status(401).json({
                message: "Current password is incorrect.",
                success: false,
            });
        }

        // Hash the new password with a salt factor of 10
        const hashedPassword = await bcrypt.hash(newPassword, 10);

       // Update the user's password with the hashed new password
        user.password = hashedPassword;
        // Save the updated user object with the new password
        await user.save();

        // Return a success message to the frontend
        res.status(200).json({
            message: "Password changed successfully.",
            success: true,
        });
    } catch (error) {
        // If an error occurs during the password change process, pass it to the next middleware
        next(error);
    }
};