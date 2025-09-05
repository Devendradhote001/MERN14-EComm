import axios from "axios";
import { axiosInstance } from "../config/axiosInstance";

export const registerUser = async (data) => {
  try {
    let newUser = await axiosInstance.post("/auth/user/register", data);
    if (newUser) {
      console.log("user created");
      return newUser.data.user;
    }
  } catch (error) {
    console.log("error in registration", error);
  }
};

export const loginUser = async (data) => {
  try {
    let loggedinUser = await axiosInstance.post("/auth/user/login", data);
    if (loggedinUser) {
      console.log("user created");
      return loggedinUser.data.user;
    }
  } catch (error) {
    console.log("error in Login", errors);
  }
};
