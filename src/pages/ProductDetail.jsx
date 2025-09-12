import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import {
  Heart,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Share,
  Shield,
  Truck,
  RotateCcw,
  Currency,
  Contact,
} from "lucide-react";
import { fetchProductDetail } from "../apis/ProductApis";
import { createOrder } from "../apis/paymentApis";
import { axiosInstance } from "../config/axiosInstance";
// import { axiosInstance } from "../config/axiosInstance";
// import { fetchProductDetail } from "../apis/ProductApis";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [productDets, setProductDets] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProductDetail = async () => {
    try {
      setLoading(true);
      // Uncomment for real API call
      // let response = await fetchProductDetail(id);
      // setProductDets(response);

      // Mock API delay
      let res = await fetchProductDetail(id);
      setProductDets(res);
    } catch (error) {
      console.log("error in detail page", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < productDets?.stock) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePayment = async () => {
    try {
      const orderData = {
        amount: productDets?.price?.amount,
        currency: productDets?.price?.currency,
        product_id: id,
        user_id: user._id,
      };

      let res = await createOrder(orderData);
      var order_id = res.data.order.order_id;
      if (res) {
        const options = {
          key: res.data.razorpay_key,
          order_id: res.data.order.order_id,
          name: "E-comm app",
          description: "Product purchasing",
          amount: productDets?.price?.amount,
          currency: productDets?.price?.currency,
          handler: async (response) => {
            let dets = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: order_id,
            };
            console.log("response after pay-0>", response);
            // call verify api
            let res = await axiosInstance.post("/payment/verify-payment", dets);
            if (res) {
              alert("Payment successfull");
            } else {
              alert("bhaag jaa nahi hua ");
            }
          },
          prefill: {
            name: "devendra",
            contact: 1234567890,
            email: "raju@gmail.com",
          },
          theme: {
            color: "blue",
          },
        };

        const rzps = new window.Razorpay(options);
        rzps.open();
      }
    } catch (error) {
      console.log("me page me hu-->", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!productDets) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Product not found
          </h2>
          <p className="text-gray-500">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Image Gallery */}
            <div className="p-6 lg:p-8">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={productDets.images[selectedImage]}
                  alt={productDets.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Image Thumbnails */}
              {productDets.images.length > 1 && (
                <div className="flex gap-3">
                  {productDets.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-blue-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${productDets.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 lg:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 127 reviews
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {productDets.title}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {productDets.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{productDets.price.amount.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹3,499
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    14% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      productDets.stock > 10 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {productDets.stock > 10 ? "In Stock" : "Low Stock"} (
                    {productDets.stock} units available)
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= productDets.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: ₹
                    {(productDets.price.amount * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 rounded-xl border transition-colors ${
                      isWishlisted
                        ? "border-red-300 bg-red-50 text-red-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-4 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="w-5 h-5" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Water resistant design</li>
                <li>• 7-day battery life</li>
                <li>• Heart rate monitoring</li>
                <li>• Sleep tracking</li>
                <li>• GPS enabled</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Compatibility
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• iOS 12.0 and above</li>
                <li>• Android 6.0 and above</li>
                <li>• Bluetooth 5.0</li>
                <li>• WiFi connectivity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                In The Box
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Smart Watch</li>
                <li>• Magnetic charging cable</li>
                <li>• Quick start guide</li>
                <li>• Warranty card</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
