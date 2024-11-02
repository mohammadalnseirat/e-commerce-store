import { handleError } from "../utils/error.js";
import Product from "../models/product.model.js";

//! 1- Function To Add Product To Cart:
export const addProductToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    // ?Find the existing Item in the Cart:
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // *Increase the quantity of the existing item:
      existingItem.quantity += 1;
    } else {
      // *Add a new item to the Cart:
      user.cartItems.push(productId);
    }
    // ?save the user:
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error adding product to cart", error.message);
    next(error);
  }
};
