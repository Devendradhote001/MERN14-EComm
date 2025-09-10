import { axiosInstance } from "../config/axiosInstance";

export const fetchAllProducts = async () => {
  try {
    let response = await axiosInstance.get("/products");
    if (response) {
      return response.data.products;
    }
  } catch (error) {
    console.log("error in fetching products....", error);
  }
};

export const fetchProductDetail = async (id) => {
  try {
    let response = await axiosInstance.get(`/products/product-details/${id}`);
    if (response) {
      return response.data.product;
    }
  } catch (error) {
    console.log("error in product detail", error);
  }
};

export const createProduct = async (data) => {
  try {
    let response = await axiosInstance.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in creating products..", error);
  }
};
