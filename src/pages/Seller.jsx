import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  Plus,
  X,
  Package,
  IndianRupee,
  DollarSign,
  ImageIcon,
} from "lucide-react";
import { createProduct } from "../apis/ProductApis";

const Seller = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: {
        amount: "",
        currency: "INR",
      },
      stock: "",
    },
  });

  const selectedCurrency = watch("price.currency");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imageFiles.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Create previews
    const newPreviews = [...imagePreviews];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file,
          preview: e.target.result,
          id: Date.now() + Math.random(),
        });
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    const newFiles = imageFiles.filter((_, index) => index !== indexToRemove);
    const newPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]); // Append each image file
    }

    // Append other fields to formData as strings
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("price[amount]", data.price.amount);
    formData.append("price[currency]", data.price.currency);
    
    console.log("formadata this side-->", formData);

    let newProductObj = {
      title: data.title,
      description: data.description,
      stock: data.stock,
      price: {
        amount: data.price.amount,
        currency: data.price.currency,
      },
      images: imageFiles,
    };

    try {
      // Simulate API call

      // Here you would typically:
      // 1. Upload images to cloud storage
      // 2. Get image URLs
      // 3. Submit form data with image URLs to your backend

      let res = await createProduct(formData);
      if (res) console.log(res);

      reset();
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error registering product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Seller Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Register your products and start selling
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add New Product
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="p-8 space-y-8"
          >
            {/* Product Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product title..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Description *
              </label>
              <textarea
                rows={5}
                {...register("description", {
                  required: "Product description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your product in detail..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Amount *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {selectedCurrency === "INR" ? (
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price.amount", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.price?.amount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price?.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  {...register("price.currency")}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                {...register("stock", {
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter available stock..."
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Product Images (Max 5)
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={imageFiles.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer flex flex-col items-center ${
                    imageFiles.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-gray-600 font-medium mb-1">
                    {imageFiles.length >= 5
                      ? "Maximum images reached"
                      : "Click to upload images"}
                  </span>
                  <span className="text-gray-400 text-sm">
                    PNG, JPG, JPEG up to 5MB each
                  </span>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((item, index) => (
                    <div key={item.id} className="relative group">
                      <img
                        src={item.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Registering Product...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 mr-2" />
                    Register Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-3">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Easy Upload</h3>
            <p className="text-gray-600 text-sm">
              Upload multiple product images with drag and drop functionality
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-green-600 mb-3">
              <IndianRupee className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Multi-Currency</h3>
            <p className="text-gray-600 text-sm">
              Support for multiple currencies including INR and USD
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-purple-600 mb-3">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Inventory Tracking</h3>
            <p className="text-gray-600 text-sm">
              Keep track of your product stock levels efficiently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
