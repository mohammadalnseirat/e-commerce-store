import { handleError } from "../utils/error.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";

//! 1-Function To Create Check out Session:
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products, couponCode } = req.body;
    // ?Check if the Array of Products is empty:
    if (!Array.isArray(products) || products.length === 0) {
      return next(
        handleError(400, "Products Array is Empty or No Products Avialable")
      );
    }

    // ?Calcluate the Amount of Order:
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); //! stripe wants you to send in the format of cents
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    // ?Check for cpoupon:
    let coupon = null;
    if (couponCode) {
      // ?Find the coupon:
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    // ?Create the Checkout Session:
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/purchase-success?session._id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              // ?create a new Coupon:
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id,
        couponCode: couponCode,
        products: JSON.stringify(
          products.map((p) => {
            return {
              id: p._id,
              price: p.price,
              quantity: p.quantity,
            };
          })
        ),
      },
    });

    //! check if the user shop more than 200$ in cents:
    if (totalAmount >= 20000) {
      //?Create a new Coupon:(in mongo db)
      await createNewCoupon(req.user._id);
    }
    // ?send the response back:
    res.status(200).json({
      id: session.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.log("Error creating checkout session", error.message);
    next(error);
  }
};

//! Function To Create Stripe Coupon:
const createStripeCoupon = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

//! Function To Create New Coupon In MongoDb:
const createNewCoupon = async (userId) => {
  // ?delete Previous Coupon:
  await Coupon.findOneAndDelete({
    userId,
  });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
};
