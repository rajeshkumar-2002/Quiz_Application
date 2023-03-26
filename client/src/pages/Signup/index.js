import React, { useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      phone: phone,
      name: name,
      profile_pic:
        "https://play-lh.googleusercontent.com/ol5HVJD-_XKpU0v2VBIYXb75aScgqb-7k3_5NJoPR_ds25TxdajQ77pBKCxskayY8Q7D=rw-w250",
    };
    axios
      .post(config.apiUrl + "/signup", data)
      .then((response) => {
        setError("");
        setMessage(
          "An email has been sent to your email address for verification."
        );
        successtost(
          "An email has been sent to your email address for verification."
        );
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          setError("The user already exists, please try logging in.");
          errortost("The user already exists, please try logging in.");
        } else {
          setError("Error while creating the user");
          errortost("Error while creating the user");
        }
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
              <h1 className="fs-1 text-color-headding">Get started</h1>
              <h2 className="fs-6 text-color-subheadding">
                Create a new account
              </h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-group pt-4">
                    <label
                      htmlFor="name"
                      className="fs-6 text-color-subheadding"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="form-control auth-input"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label
                      htmlFor="email"
                      className="fs-6 text-color-subheadding"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label
                      htmlFor="phone"
                      className="fs-6 text-color-subheadding"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="form-control auth-input"
                      placeholder="9876543210"
                      type="tel"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label
                      htmlFor="password"
                      className="fs-6 text-color-subheadding"
                    >
                      Password
                    </label>
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
                      value="Signup"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center pt-3">
                  <span
                    htmlFor="password"
                    className="fs-6 text-color-subheadding"
                  >
                    Have an account?&nbsp;
                  </span>
                  <Link className="link-without-underline" to="/">
                    <p className="fs-6 text-color-headding"> Sign In Now</p>
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

export default Signup;
