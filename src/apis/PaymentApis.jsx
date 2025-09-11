import { axiosInstance } from "../config/axiosInstance";

export const createOrder = async (data) => {
  try {
    let response = await axiosInstance.post("/payment/create-order", data);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log("error while generating order", error);
  }
};
