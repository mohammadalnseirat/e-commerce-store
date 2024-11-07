import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  // ?Function To Create a Product:
  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/v1/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
