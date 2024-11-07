import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];
const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  //! handle Image Change:
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // base64 encoding
    }
  };
  const { loading, createProduct } = useProductStore();
  //! handle Create Product:
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    // your code to create new product goes here:
    await createProduct(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-emerald-500 max-w-xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-4 text-emerald-500 text-center ">
        Create Product
      </h2>
      <form className="sapce-y-4" onSubmit={handleCreateProduct}>
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-sm text-gray-300 capitalize "
          >
            product name:
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 w-full block bg-gray-800 rounded-md shadow-sm py-2 px-3 border border-emerald-400 text-white focus:ring-emerald-500 focus:outline-none focus:ring-2 focus:border-emerald-600"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="description"
            className="block font-medium text-sm text-gray-300 capitalize"
          >
            Description:
          </label>
          <textarea
            required
            type="text"
            name="description"
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 rounded-md shadow-sm py-2 px-3 border border-emerald-400 text-white focus:ring-emerald-500 focus:outline-none focus:ring-2 focus:border-emerald-600"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="price"
            className="block font-medium text-sm text-gray-300 capitalize"
          >
            price :
          </label>
          <input
            required
            type="number"
            step={"0.01"}
            name="price"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="mt-1 w-full block bg-gray-800 rounded-md shadow-sm py-2 px-3 border border-emerald-400 text-white focus:ring-emerald-500 focus:outline-none focus:ring-2 focus:border-emerald-600"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="category"
            className="block text-sm text-gray-300 capitalize font-semibold"
          >
            category :
          </label>
          <select
            required
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 rounded-md shadow-sm py-2 px-3 border border-emerald-400 text-white focus:ring-emerald-500 focus:outline-none focus:ring-2 focus:border-emerald-600"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="sr-only"
            required
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-emerald-500 text-sm">
              Image Uploaded Successfully
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-4 flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <>
              Creating Product....
              <Loader className="h-5 w-5 animate-spin ml-2" />
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5  mr-2" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
