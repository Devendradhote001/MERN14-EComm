import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  return isLoggedIn ? <>{children}</> : "";
};

export default ProtectedRoute;
