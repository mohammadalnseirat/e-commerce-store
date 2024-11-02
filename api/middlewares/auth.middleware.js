import jwt from "jsonwebtoken";
import { handleError } from "../utils/error.js";
import User from "../models/user.model.js";

// !Function To Make Protected Routes:
export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_Token;
    console.log("Access token: " + accessToken);
    if (!accessToken) {
      return next(
        handleError(401, "Unauthorized - Access token not provided.")
      );
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_TOKEN);
    if (!decoded) {
      return next(handleError(403, "Unauthorized - Invalid access token."));
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(handleError(404, "User not found."));
    }
    //! Send the authenticated user to the request:
    req.user = user;
    next();
  } catch (error) {
    console.log("Error while protected route", error.message);
    next();
  }
};

//! Function to Admin reoutes:
export const AdminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return next(
        handleError(403, "Unauthorized - Asccess denied, you are not an admin.")
      );
    }
  } catch (error) {
    console.log("Error while Admin route", error.message);
    next();
  }
};
