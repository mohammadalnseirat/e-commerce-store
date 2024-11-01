import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY_TOKEN, {
    expiresIn: "15m", // expires in 15 minutes
  });
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY_TOKEN_REFRESH,
    {
      expiresIn: "7d", // expires in 7 days
    }
  );
  return { accessToken, refreshToken };
};
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_Token", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    sameSite: "strict", // prevent XSS attacks,  cross-site request forgery attack
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refresh_Token", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    sameSite: "strict", // prevent XSS attacks,  cross-site request forgery attack
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
};
//! 1-Function To Sign Up User:
export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(handleError(400, "User Already Exists"));
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return next(
        handleError(
          400,
          "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    // ?generate tokens:
    const { accessToken, refreshToken } = generateTokens(user._id);

    //!set Refresh token to the rids:
    await storeRefreshToken(user._id, refreshToken);
    // ?Store refresh token and access token to the cookies:
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error While Sign Up User", error.message);
    next(error);
  }
};

//! 2-Function To Sign In User:
export const signInUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error While Sign In User", error.message);
    next(error);
  }
};

//! 3-Function To Log Out User:
export const logOutUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error While Log Out User", error.message);
    next(error);
  }
};
