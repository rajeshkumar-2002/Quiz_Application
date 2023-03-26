import React, { useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    axios
      .post(config.apiUrl + "/forgotpassword", data)
      .then((response) => {
        setError("");
        setMessage("Mail has been send to your email to change password!");
        successtost("E-mail has been sent to your e-mail address to change the password!")
      })
      .catch((error) => {
        if (error.response.data.message === "No User Found!") {
          setError("No User Found!");
          errortost("User not found!");
        } else {
          setError("Error while sending the mail");
          errortost("Error while sending the mail")
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
              <h1 className="fs-1 text-color-headding">Reset Your Password</h1>
              <h2 className="fs-6 text-color-subheadding">
                Type in your email and we'll send you a link to reset your
                password
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group pt-4">
                  <label
                    htmlFor="email"
                    className="fs-6 text-color-subheadding"
                  >
                    Email
                  </label>
                  <input
                    placeholder="you@example.com"
                    id="email"
                    className="form-control auth-input"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="pt-4">
                  <input
                    className="btn auth-btn"
                    style={{ width: "100%" }}
                    value="Send Reset Email"
                    type="submit"
                  />
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

export default ForgotPassword;
