import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../config/axiosInstance";
import { fetchAllProducts } from "../apis/ProductApis";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState(null);

  let getAllProducts = async () => {
    try {
      let response = await fetchAllProducts();
      if (response) {
        console.log("res-->", response);
        setAllProducts(response);
      }
    } catch (error) {
      console.log("error while fetching products data", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts?.map((product) => (
          <ProductCard
            key={product._id || product.title}
            id={product._id}
            title={product.title}
            price={product.price}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
