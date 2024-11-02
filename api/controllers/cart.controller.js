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

//! 2-Function To remove All Items From Cart:
export const removeAllItemsFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      // ?Remove all items from cart based on the productId:
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    // ?save the user:
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error removing all items from cart", error.message);
    next(error);
  }
};

//! 3- Function To Update Quantity:
export const updateQuantity = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const user = req.user;
    const { quantity } = req.body;
    // ?Find the existing Item in the Cart:
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // ?check the quantity is equal to zero:
      if (quantity === 0) {
        // ?Filter out the item:
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        res.status(200).json(user.cartItems);
      }

      // *Update the quantity of the existing item:
      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json(user.cartItems);
    } else {
      return next(handleError(404, "Product not found in the cart"));
    }
  } catch (error) {
    console.log("Error updating quantity", error.message);
    next(error);
  }
};
