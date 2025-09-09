import { axiosInstance } from "../config/axiosInstance";

export const registerSeller = async () => {
  try {
    let response = await axiosInstance.patch("/auth/seller/register");
    if (response) {
      return response.data.seller;
    }
  } catch (error) {
    console.log("error in seller registration ->", error);
  }
};
