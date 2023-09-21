
//modules and packages
import User from "../models/User.js";
import HabitList from "../models/HabitList.js";
import jwt from "jsonwebtoken";

/*Frontend developers should pay attention to the expected request methods (e.g., POST, DELETE, GET) and the data format (e.g., request bodies, response format) specified in the comments when integrating these endpoints. Additionally, they need to handle error cases, such as incorrect credentials or failed requests, and provide appropriate user feedback based on the responses received from these endpoints.

Overall, these endpoints and middleware are essential for building a secure and functional user authentication system in a web application. Frontend developers should ensure they follow the defined conventions and error handling patterns for a smooth integration experience. */

//^Function to sign a JSON Web Token (JWT) for user authentication
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

// Function to create and send a JWT token as a cookie in the response
const createSendToken = (user, statusCode, res) => {

   // Create a JWT token for the user
  const jwtToken = signToken(user._id);

  // Configure options for the JWT token cookie
  const cookieOptions = {
    httpOnly: true,  // The cookie cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === "production",  // Secure cookie in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",  // Set SameSite attribute
  };

  // Set the JWT token as a cookie in the response
  res.cookie("jwtToken", jwtToken, cookieOptions);

    // Remove the user's password from the response
  user.password = undefined;

  // Send a JSON response with success status and user data
  res.status(statusCode).json({
    message: "success",
    success: true,
    status: statusCode,
    user,
    jwtToken,
  });
};
//~--------------------------------------------------------------------
//^ Function to create a new HabitList and associate it with a user
const createHabitList = async (user) => {
  const newHabitList = await HabitList.create({});
  user.habitListId = newHabitList._id;
  await user.save();
};
//~-------------------------------------------------------------------------------
/*registerUser Endpoint:

Purpose: This endpoint is used for user registration.
Integration: Frontend developers can create a registration form that collects user details (e.g., name, email, password) and sends a POST request to this endpoint with the user's information. Upon successful registration, the backend will create a new user account and respond with a JWT token, which the frontend can store for subsequent authenticated requests. */
//^ Controller function to register a new user
export const registerUser = async (req, res, next) => {
  try {
      // Create a new user based on the request body
    const user = await User.create(req.body);

      // Create a HabitList for the user
    await createHabitList(user);

      // Create and send a JWT token as a response
    createSendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
//~-------------------------------------------------------------------
/*loginUser Endpoint:

Purpose: This endpoint is used for user login.
Integration: Frontend developers should create a login form where users enter their email and password. When the form is submitted, a POST request should be sent to this endpoint with the user's credentials. If the credentials are correct, the backend responds with a JWT token, which the frontend can use to authenticate the user for subsequent requests. */
//^ Controller function to log in a user
export const loginUser = async (req, res, next) => {
  try {

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password)
      throw authError(400, "Please provide email and password");

      // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw authError(401, "Incorrect email or password");
    }

     // Create and send a JWT token as a response
    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//~ -----------------------------------------------------------------------
/*logout Endpoint:

Purpose: This endpoint logs a user out by removing the JWT token cookie.
Integration: When the frontend wants to log the user out, it can make a GET or POST request to this endpoint. Upon successful logout, the backend removes the JWT token cookie, effectively ending the user's session. */
//^ Controller function to log out a user
export const logout = async (req, res, next) => {
  try {

    // Remove the JWT token cookie from the response
    removeCookies(res, "jwtToken");

    // Send a success response
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

//~ ---------------------------------------------------------------------
/*protect Middleware:

Purpose: This middleware protects routes that require authentication.
Integration: Frontend developers should attach this middleware to routes that require authentication. Before accessing a protected route, the frontend should ensure that it has a valid JWT token (usually stored in a cookie or local storage). If the token is present, it should be included in the request headers when accessing protected resources. */
//^ Middleware function to protect routes requiring authentication
export const protect = async (req, res, next) => {
  try {
    let jwtToken;

     // Extract the JWT token from the request headers
    //! This is used to get token from postman
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      jwtToken = authorization.split(" ")[1];
    }

     // Verify and decode the JWT token
    //! This will be used to get token from browser
    // const jwtToken = req.cookies["jwtToken"];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

     // Check if the token is valid and extract user information
    if (!decoded.id) throw authError(401, "Invalid token");
    const user = await User.findById(decoded.id);

     // Check if the user exists
    if (!user) throw authError(401, "User not found.");

     // Attach the user and authentication flag to the request object
    req.user = user;
    req.isAuthenticated = true;

     // Continue to the next middleware or route
    next();
  } catch (error) {
    next(error);
  }
};
//~-----------------------------------------------
/*deleteAccount Endpoint:

Purpose: This endpoint allows a user to delete their account.
Integration: To implement account deletion, frontend developers can create a UI element or form that triggers a DELETE request to this endpoint when the user confirms account deletion. Upon successful deletion, the backend removes the user's data and JWT token cookie. The frontend should also clear any stored tokens on its end.
 */
//^ Controller function to delete a user's account
export const deleteAccount = async (req, res, next) => {
  try {
    const { user } = req;

    // Delete the user's account from the database
    await User.findByIdAndDelete(user._id);

    // Optionally, delete the user's associated HabitList or any other related data
    await HabitList.findByIdAndDelete(user.habitListId);

     // Log the user out by removing the JWT token cookie
    removeCookies(res, "jwtToken");

     // Send a success response
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
