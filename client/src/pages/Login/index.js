import React, { useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { useDispatch } from "react-redux";
import { login } from "./LoginSlice";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(config.apiUrl + "/login", data)
      .then((response) => {
        if (response.data.message === "Please verify your email to login") {
          setError("Please verify your email");
          errortost("Please verify your email");
          setMessage("");
        } else {
          dispatch(login(response.data));
          setError("");
          setMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Invalid login credentials");
        errortost("Invalid login credentials");
      });
  };

  const resendmail = () => {
    const data = {
      email: email,
    };
    axios
      .post(config.apiUrl + "/resendverifymail", data)
      .then((response) => {
        console.log(response);
        setError("");
        setMessage("Resend mail successfull");
        successtost("Resend mail successfull");
      })
      .catch((error) => {
        console.log(error);
        setError("Error occured while sending the mail");
        errortost("Error occured while sending the mail");
        setMessage("");
      });
  };

  const errortost = (tost_message) => {
    toast.error(tost_message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const successtost = (tost_message) => {
    toast.success(tost_message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="d-flex justify-content-center mt-5">
          <div className="mt-5 card border-0 bg-transparent col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12">
            <div className="card-body">
              <h1 className="fs-1 text-color-headding">Welcome back</h1>
              <h2 className="fs-6 text-color-subheadding">
                Sign in to your account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group pt-4">
                  <label
                    htmlFor="email"
                    className="fs-6 text-color-subheadding"
                  >
                    Email
                  </label>
                  <div>
                    <input
                      id="email"
                      className="form-control auth-input"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group pt-4">
                  <div className="d-flex justify-content-between">
                    <label
                      htmlFor="password"
                      className="fs-6 text-color-subheadding"
                    >
                      password
                    </label>
                    <Link
                      className="link-without-underline"
                      to="/forgotpassword"
                    >
                      <p className="fs-6 text-color-subheadding">
                        Forgot Password?
                      </p>
                    </Link>
                  </div>
                  <div className="password-container">
                    <input
                      id="password"
                      className="form-control auth-input"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="•••••••••"
                      required
                    />
                    <div
                      className="fa-eye"
                      type="button"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash fs-5"></i>
                      ) : (
                        <i className="bi bi-eye fs-5"></i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <input
                    className="btn auth-btn"
                    style={{ width: "100%" }}
                    type="submit"
                    value="Login"
                  />
                </div>
                <div className="pt-4 justify-content-center">
                  {error === "Please verify your email" && (
                    <div className="d-flex justify-content-center">
                      <span className="text-color-subheadding">
                        Haven't received a verification email?&nbsp;
                        <span
                          className="text-color-headding"
                          onClick={resendmail}
                          style={{ cursor: "pointer" }}
                        >
                          Resend it here.
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center pt-3">
                  <span
                    htmlFor="password"
                    className="fs-6 text-color-subheadding"
                  >
                    Don't have an account?&nbsp;
                  </span>
                  <Link className="link-without-underline" to="/signup">
                    <p className="fs-6 text-color-headding">Sign Up Now</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
