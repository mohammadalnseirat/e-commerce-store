import User from "../models/user.model.js";
import {handleError} from '../utils/error.js';


//! 1-Function To Sign Up User:
export const signUpUser = async (req, res, next) => {
  try {
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
