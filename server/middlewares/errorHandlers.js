
// Import modules and packages
import createError from "http-errors";
import mongoose from "mongoose";

//^ Handler for duplicate field errors
export const duplicateFieldsHandler = (keyValue) => {

   // Extract the field name from the keyValue object
  const field = Object.keys(keyValue)[0];

   // Create a custom error message for duplicate fields
  return createError(`${field} is already exist`);
};

//~--------------------------------------------------------------------------
//^ Check if a provided ID is valid
export const isValidId = (req) => {

  // Validate the format of the provided ID using mongoose
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw createError("The provided ID is invalid.");
};

//~----------------------------------------------------------------------------
//^ Handler for resource not found errors
export const resourceNotFound = (resource, document, action) => {
   // Check if the resource is missing
  if (!resource)
    throw createError(
      404,
      `Sorry, the ${document} you are trying to ${action} doesn't seem to exist.`
    );
};

//~------------------------------------------------------------------------------
//^ Handler for custom authentication errors
export const authError = (statusCode, message) => {

  // Throw a custom error with the specified status code and message
  throw createError(statusCode, message);
};

//~-------------------------------------------------------------------------------
//^ Middleware to handle route not found errors
export const routeNotFound = (req, res, next) =>
  next(createError(404, "Resource not found"));

//~----------------------------------------------------------------------
//^ Global error handler middleware
export const globalErrorHandler = (err, req, res, next) => {
  // Set the HTTP status code based on the error's status or default to 500 (Internal Server Error)
  res.status(err.status || 500).json({
    statusCode: err.statusCode,

    // Determine the error type based on the status code
    type:
      err.status === 500
        ? "server error"
        : err.stack.split(":")[0].replace(/([a-z])([A-Z])/g, "$1 $2"),

    // Include the error message and stack trace in the response
    message: err.message,
    stack: err.stack,
  });
};