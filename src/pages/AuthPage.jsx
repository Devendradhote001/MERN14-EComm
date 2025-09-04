import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {flag ? (
        <RegisterForm setFlag={setFlag} />
      ) : (
        <LoginForm setFlag={setFlag} />
      )}
    </div>
  );
};

export default AuthPage;
