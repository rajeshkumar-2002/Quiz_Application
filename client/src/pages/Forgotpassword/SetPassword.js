import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tokenfail, setTokenfail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { token } = useParams();

  useEffect(() => {
    axios
      .get(config.apiUrl + "/changepassword/" + token)
      .then((response) => {
        setError("");
        setTokenfail(false);
      })
      .catch((error) => {
        if (error?.response?.data.message === "Invalid confirmation link.") {
          setError("Invalid confirmation link.");
        }
        if (
          error?.response?.data.message === "Confirmation link has expired."
        ) {
          setError("link has expired.");
        }
        setMessage("");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      password: password,
    };
    axios
      .post(config.apiUrl + "/changepassword/" + token, data)
      .then((response) => {
        setError("");
        setMessage("Password changed successfully !");
        successtost("Password changed successfully !");
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "Old password canot be your new password"
        ) {
          setError("Old password canot be your new password");
          errortost("Old password canot be your new password");
        } else {
          setError("Error while changing the password");
          errortost("Error while changing the password");
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
      {tokenfail ? (
        <>
          <div className="container">
            <div className="d-flex justify-content-center mt-5">
              <div className="mt-5 card border-0 bg-transparent col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12">
                <div className="card-body">
                  <h1 className="fs-1 text-color-headding">Forgot Password</h1>
                  <h2 className="fs-6 text-color-subheadding">
                    Changing the current password
                  </h2>
                  <div>
                    <p className="fs-1 text-danger">Link has been expired</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <ToastContainer />
          <div className="d-flex justify-content-center mt-5">
            <div className="mt-5 card border-0 bg-transparent col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12">
              <div className="card-body">
                <h1 className="fs-1 text-color-headding">Forgot Password</h1>
                <h2 className="fs-6 text-color-subheadding">
                  Changing the current password
                </h2>
                <form onSubmit={handleSubmit}>
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
                      value="Change password"
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
      )}
    </>
  );
}

export default SetPassword;
