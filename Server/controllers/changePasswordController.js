import User from "../models/User.js";
import bcrypt from "bcrypt";

// Function to change the user's password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { user } = req;

        // Check if the provided current password matches the user's current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect.",
                success: false,
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Return a success message
        res.status(200).json({
            message: "Password changed successfully.",
            success: true,
        });
    } catch (error) {
        next(error);
    }
};