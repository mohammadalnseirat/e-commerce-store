import { handleError } from "../utils/error.js";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

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

//! 2- Function To Get Featured Products:(store in redis db)
export const getFeaturedProducts = async (req, res, next) => {
  try {
    //* check if there is a product in the redis db:
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      //* if yes, send the product from redis db:
      res.status(200).json(JSON.parse(featuredProducts));
    }

    //* if no, get the products from the mongo db and store them in the redis db:
    //? .lean() is gonna return a plain javascript object instead of a mongodb document
    //? which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return next(handleError(404, "No featured products found"));
    }
    //* store the products in redis db:
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    //* send the product to the client:
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error getting featured products", error.message);
    next(error);
  }
};
//! 3-Function To Create Product:
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return next(handleError(401, "All fields are required"));
    }
    let cloudinaryResponse = null;
    //* upload image to cloudinary:
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    //* create a new product document:
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
    });

    // ? send the response back:
    res.status(201).json(product);
  } catch (error) {
    console.log("Error creating product", error.message);
    next(error);
  }
};

//! 4-Function To delete a product:
export const deleteProduct = async (req, res, next) => {
  try {
    // const { id } = req.params;
    //* find the product by id:
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(handleError(404, "Product not found"));
    }
    //* remove the image from cloudinary:
    if (product.image) {
      const puplicIdImage = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${puplicIdImage}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error.message);
      }
    }
    // ? delete the product:
    await Product.findByIdAndDelete(id);
    // ? send the response back:
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error deleting product", error.message);
    next(error);
  }
};

//! 5-Function To get Recommendations Products:
export const getRecommendedProducts = async (req, res, next) => {
  try {
    const recommendedProducts = await Product.aggregate([
      {
        $sample: {
          size: 4, // get 4 random products
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
        },
      },
    ]);
    // ? send the response back:
    res.status(200).json(recommendedProducts);
  } catch (error) {
    console.log("Error getting recommendations products", error.message);
    next(error);
  }
};

//! 6- Function To get Product By Category:
export const getProductsByCategory = async(req,res,next)=>{
  const { category } = req.params;
  try {
    const productsByCategory = await Product.find({ category})
    res.status(200).json({productsByCategory})
  } catch (error) {
    console.log('Error getting products by category', error.message);
    next(error);
    
  }
}
