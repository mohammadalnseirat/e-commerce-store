import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  // ?Function To Sign up:
  signUp: async ({ name, email, password, confirmpassword }) => {
    set({ loading: true });
    //check the password:
    if (password !== confirmpassword) {
      set({ loading: false });
      return toast.error(
        "password does not match,Please enter correct passowrd!"
      );
    }

    try {
      const res = await axiosInstance.post("/v1/auth/sign-up", {
        name,
        email,
        password,
      });
      set({ user: res.data, loading: false });
      toast.success("User signed up successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      set({ loading: false });
    }
  },

  // ?Function To Sign in:
  signIn: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/v1/auth/sign-in", {
        email,
        password,
      });
      set({ loading: false, user: res.data });
      toast.success("User signed in successfully!");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      set({ loading: false });
    }
  },
}));