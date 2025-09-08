import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useFetcher, useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <p>Loading....</p>;

  if (!isLoggedIn || !user) return <Navigate to={"/auth"} />;

  return children;
};

export default ProtectedRoute;
