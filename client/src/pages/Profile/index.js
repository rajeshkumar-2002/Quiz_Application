import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { getlocalstorage } from "../../localstorage";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const email = getlocalstorage("user").user_email;
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [changepassword, setchangePassword] = useState(false);
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });
  const [pic, setpic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword_new, setshowPassword_new] = useState(false);

  const handleShowPassword_new = () => {
    setshowPassword_new(!showPassword_new);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    axios
      .get(config.apiUrl + "/profile/" + email)
      .then((response) => {
        let user = JSON.parse(
          response.data.user
            .replace(/'/g, '"')
            .replace(/True/g, "true")
            .replace(/False/g, "false")
        );
        setUser(user);
        axios
          .get(config.apiUrl + "/get_profile_image")
          .then((fil_response) => {
            console.log(fil_response.data.data.Images);
            setpic(fil_response.data.data.Images);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [edit, changepassword]);

  const handlePhoneChange = (event) => {
    setUser({
      ...user,
      phone: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    setUser({
      ...user,
      name: event.target.value,
    });
  };

  const handleImagechange = (image) => {
    setUser({
      ...user,
      profile_pic: image,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(config.apiUrl + "/update_profile/" + email, user)
      .then((response) => {
        console.log(response.data);
        successtost("Update successfully");
        setEdit(!edit);
      })
      .catch((error) => {
        errortost("Error while updating");
        console.log(error);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    axios
      .put(config.apiUrl + "/change_password/" + email, password)
      .then((response) => {
        if (
          response.data.message === "Old password cant be your new password"
        ) {
          errortost("Error while changing password");
        } else {
          console.log(response.data);
          successtost("Password changed successfully");
        }
        setchangePassword(!changepassword);
      })
      .catch((error) => {
        errortost("Error while changing password");
        console.log(error);
      });
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]*$/; // Regular expression to match only numbers

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
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
    <div className="container">
      <ToastContainer />
      <h1 className="mt-5 text-center">Profile</h1>
      <div className="d-flex justify-content-center mt-5">
        <div
          className=" card border-0 col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12"
          style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
        >
          {pic && (
            <div className="card-body p-4">
              {user && !edit && !changepassword && (
                <div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={user.profile_pic}
                      className="rounded-circle shadow-4"
                      style={{ width: "100px" }}
                      alt="Avatar"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="fs-6">Name : {user.name}</p>
                    <p className="fs-6">Email : {user.email}</p>
                    <p className="fs-6">Phone : {user.phone}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn auth-btn"
                      onClick={() => {
                        setEdit(!edit);
                      }}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="btn cust-profile-btn"
                      onClick={() => {
                        setchangePassword(!changepassword);
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
              {user && edit && (
                <div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          ></h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body d-flex justify-content-between">
                          {Object.entries(pic).map(([key, url]) => (
                            <div
                              key={key}
                              onClick={() => {
                                handleImagechange(url);
                              }}
                              data-bs-dismiss="modal"
                            >
                              <img
                                className="shadow-4"
                                style={{
                                  width: "100px",
                                  cursor: "pointer",
                                  borderRadius: "16px",
                                }}
                                src={url}
                                alt={key}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={user.profile_pic}
                      className="rounded-circle shadow-4"
                      style={{ width: "100px", cursor: "pointer" }}
                      alt="Avatar"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    />
                  </div>

                  <form onSubmit={handlesubmit}>
                    <div>
                      <div className="form-group pt-4">
                        <label htmlFor="email" className="fs-6">
                          Email
                        </label>
                        <input
                          id="email"
                          className="form-control ct-quiz-input"
                          placeholder="Enter Your email"
                          type="text"
                          value={user.email}
                          disabled={true}
                          required
                        />
                      </div>
                      <div className="form-group pt-4">
                        <label htmlFor="name" className="fs-6">
                          Name
                        </label>
                        <input
                          id="name"
                          className="form-control ct-quiz-input"
                          placeholder="Enter Your name"
                          type="text"
                          value={user.name}
                          onChange={handleNameChange}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group pt-4">
                        <label htmlFor="Phone" className="fs-6">
                          Phone
                        </label>
                        <input
                          id="Phone"
                          className="form-control ct-quiz-input"
                          type="text"
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your phone number"
                          value={user.phone}
                          onChange={handlePhoneChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setEdit(false);
                        }}
                      >
                        Back
                      </button>
                      <input
                        className="btn btn-success"
                        type="submit"
                        name="Save"
                        value="Save"
                      />
                    </div>
                  </form>
                </div>
              )}
              {changepassword && (
                <div>
                  <h2>Change Password</h2>
                  <form onSubmit={handleChangePassword}>
                    <div>
                      <div className="form-group pt-4">
                        <label
                          htmlFor="old_password"
                          className="fs-6 text-color-subheadding"
                        >
                          Old Password
                        </label>
                        <div className="password-container">
                          <input
                            id="old_password"
                            className="form-control auth-input"
                            type={showPassword ? "text" : "password"}
                            value={password.old_password}
                            onChange={(e) => {
                              setPassword({
                                ...password,
                                old_password: e.target.value,
                              });
                            }}
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
                      <div className="form-group pt-4">
                        <label
                          htmlFor="new_password"
                          className="fs-6 text-color-subheadding"
                        >
                          New Password
                        </label>
                        <div className="password-container">
                          <input
                            id="new_password"
                            className="form-control auth-input"
                            type={showPassword_new ? "text" : "password"}
                            value={password.new_password}
                            onChange={(e) => {
                              setPassword({
                                ...password,
                                new_password: e.target.value,
                              });
                            }}
                            required
                          />
                          <div
                            className="fa-eye"
                            type="button"
                            onClick={handleShowPassword_new}
                          >
                            {showPassword_new ? (
                              <i className="bi bi-eye-slash fs-5"></i>
                            ) : (
                              <i className="bi bi-eye fs-5"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setchangePassword(false);
                        }}
                      >
                        Back
                      </button>
                      <input
                        className="btn btn-success"
                        type="submit"
                        value="Change"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
