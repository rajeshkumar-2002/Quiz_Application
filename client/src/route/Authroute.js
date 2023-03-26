import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/Forgotpassword";
import SetPassword from "../pages/Forgotpassword/SetPassword";

function AuthRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword/:token" element={<SetPassword />} />
      </Routes>
    </>
  );
}

export default AuthRoute;
