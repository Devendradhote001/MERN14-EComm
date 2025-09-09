import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetail from "../pages/ProductDetail";
import Seller from "../pages/Seller";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route path="/seller" element={<Seller />} />
    </Routes>
  );
};

export default AppRouter;
