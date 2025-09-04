import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRouter;
