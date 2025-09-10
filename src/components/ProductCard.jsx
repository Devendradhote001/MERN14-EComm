import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ title, price, images, id }) => {
  console.log(images);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 flex flex-col">
      <img
        onClick={() => navigate(`/product-detail/${id}`)}
        src={images[0]}
        alt={title}
        className="h-48 w-full object-cover rounded-t-xl"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {title}
        </h2>
        <div className="mt-auto">
          <span className="text-xl font-bold text-blue-600">
            ₹{price.amount}
          </span>
          <span className="text-sm text-gray-500 ml-1">{price.currency}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
