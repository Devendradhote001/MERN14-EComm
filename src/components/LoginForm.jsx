import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../apis/AuthApis";

const LoginForm = ({ setFlag }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let loggedinUser = await loginUser(data);
      console.log(loggedinUser);
    } catch (error) {
      console.log("error in login form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
        Login
      </h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className={`w-full px-4 py-2 rounded border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={`w-full px-4 py-2 rounded border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
      <div className="text-center mt-4 text-sm text-gray-700">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline font-semibold"
          onClick={() => setFlag((prev) => !prev)}
        >
          Register here
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
