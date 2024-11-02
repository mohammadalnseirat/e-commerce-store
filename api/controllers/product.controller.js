import { handleError } from "../utils/error.js";
import Product from "../models/product.model.js";

//! 1-Function To Create Product:
export const createProduct = async(req,res,next)=>{
    try {
        
    } catch (error) {
        console.log('Error creating product', error.message);
        next(error);
        
    }
}