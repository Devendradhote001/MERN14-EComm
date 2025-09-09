import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../apis/AuthApis";
import { useSelector } from "react-redux";
import { registerSeller } from "../apis/SellerApis";
import { useNavigate } from "react-router";

const RegisterForm = ({ setFlag }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("-------->", data.role);
    try {
      let newUserObj = {
        username: data.username,
        email: data.email,
        password: data.password,
        fullName: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      };

      if (data.role === "seller") {
        let res = await registerSeller();
        console.log(res);
        navigate("/seller");
      } else {
        let user = await registerUser(newUserObj);
      }
    } catch (error) {
      console.log("error in registration form", error);
    }
  };

  return (
    <form
      className="space-y-5 bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
        Register
      </h2>
      <div className="flex gap-3">
        <div className="w-1/2">
          <input
            type="text"
            defaultValue={user.fullName.firstName}
            disabled={user ? true : false}
            placeholder="First Name"
            {...register("firstName", { required: "First name is required" })}
            className={`w-full px-4 py-2 rounded border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-blue-600`}
          />
          {errors.firstName && (
            <span className="text-xs text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="w-1/2">
          <input
            type="text"
            defaultValue={user.fullName.lastName}
            disabled={user ? true : false}
            placeholder="Last Name"
            {...register("lastName")}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          defaultValue={user.username}
          disabled={user ? true : false}
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className={`w-full px-4 py-2 rounded border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.username && (
          <span className="text-xs text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div>
        <input
          type="email"
          defaultValue={user.email}
          disabled={user ? true : false}
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          className={`w-full px-4 py-2 rounded border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          defaultValue={user.password}
          disabled={user ? true : false}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={`w-full px-4 py-2 rounded border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <select
          {...register("role")}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-600"
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
      >
        Register
      </button>
      <div className="text-center mt-4 text-sm text-gray-700">
        Already have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline font-semibold"
          onClick={() => setFlag((prev) => !prev)}
        >
          Login here
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
