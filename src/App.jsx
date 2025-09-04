import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import { axiosInstance } from "./config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "./features/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let me = await axiosInstance.get("/auth/me");
        console.log(me.data.user);
        if (me) {
          dispatch(addUser(me?.data?.user));
        }
      } catch (error) {
        console.log("errro in / me router");
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
