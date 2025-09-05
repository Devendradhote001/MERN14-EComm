import axios from "axios";
import { store } from "../store/store";
import { setError } from "../features/errorSlice";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMsg = error.response?.data?.message;
    store.dispatch(setError(errorMsg));
    return Promise.reject(error);
  }
);
