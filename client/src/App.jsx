import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import AdminPage from "./Pages/AdminPage";
import CartPage from "./Pages/CartPage";
import CategoryPage from "./Pages/CategoryPage";
import PurchaseSucessPage from "./Pages/PurchaseSucessPage";
import PurchaseCancelPage from "./Pages/PurchaseCancelPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  //! useEffect To Check Auth:
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // ? Checking Auth:(loading Spinner) check the state of the user:
  if (checkingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-800 text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative pt-20 z-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sign-up"
            element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/sign-in"
            element={!user ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route path="/secret-dashboard" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/purchase-success" element={<PurchaseSucessPage />} />
          <Route path="/purchase-cancel" element={<PurchaseCancelPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
