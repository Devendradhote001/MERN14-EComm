import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
