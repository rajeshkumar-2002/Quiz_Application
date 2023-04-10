import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/Forgotpassword";
import SetPassword from "../pages/Forgotpassword/SetPassword";
import Authnav from "../components/molecule/Authnavbar";
import About from "../pages/About";
import Pagenotfound from "../pages/404Error";
import NotloginQuiz from "../pages/404Error/NotloginQuiz";

function AuthRoute() {
  return (
    <>
      <Authnav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword/:token" element={<SetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz/*" element={<NotloginQuiz />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default AuthRoute;
