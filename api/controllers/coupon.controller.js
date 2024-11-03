import { handleError } from "../utils/error.js";
import Coupon from "../models/coupon.model.js";

//! 1-Function To get Coupon:
export const getCoupon = async (req, res, next) => {
  try {
    // ?Find the coupon for the user:
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return next(handleError(404, "Coupon not found"));
    }
    res.status(200).json(coupon || null);
  } catch (error) {
    console.log("Error while getting coupon", error.message);
    next(error);
  }
};

//!2- Function To Validate Coupon:
export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;
    // ?Find the coupon:
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: trur,
    });
    if (!coupon) {
      return next(handleError(404, "Coupon not found"));
    }
    //! Check The Expiration Date:
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return next(handleError(404, "Coupon expired"));
    }
    // ?send the response back:
    res.status(200).json({
      message: "Coupon is Valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error while validating coupon", error.message);
    next(error);
  }
};
