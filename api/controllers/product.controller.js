import { handleError } from "../utils/error.js";
import Product from "../models/product.model.js";

//! 1-Function To Get All Products:
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}); // get all products
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error getting all products", error.message);
    next(error);
  }
};
//! 3-Function To Create Product:
export const createProduct = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error creating product", error.message);
    next(error);
  }
};
