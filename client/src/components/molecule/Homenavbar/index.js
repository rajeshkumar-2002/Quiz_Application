import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../pages/Login/LoginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../api/config";
import { getlocalstorage } from "../../../localstorage";
import { ProfileContext } from "../../../route/Homeroute";
import { useContext } from "react";

function Homenave() {
  const email = getlocalstorage("user").user_email;
  const { profile } = useContext(ProfileContext);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  function closeNav() {
    document.querySelector(".navbar-collapse").classList.remove("show");
  }

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profile]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const Loggedout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div
      className="container sticky-top pt-2"
      style={{ backgroundColor: "black" }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-5-strong"
        style={{ width: "95%" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="./">
            <img src={logo} style={{ width: "50px" }} alt="" />
            Alpha
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 column-gap-4 align-items-center">
              <li className="nav-item">
                <Link onClick={closeNav} className="nav-link active" to="./">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 column-gap-4 align-items-center">
              <li className="nav-item  text-center">
                <div className="dropdown align-items-center" ref={dropdownRef}>
                  <Link onClick={toggleDropdown} className="btn">
                    <img
                      src={
                        user?.profile_pic
                          ? user?.profile_pic
                          : "https://th.bing.com/th/id/OIP.v_y_SOANkb1ho3WK6LHbqgHaEK?pid=ImgDet&rs=1"
                      }
                      className="rounded-circle shadow-4"
                      style={{ width: "50px" }}
                      alt="Avatar"
                    />
                  </Link>
                  <ul
                    className={`dropdown-menu dropdown-hover ${
                      isOpen ? "show" : ""
                    }`}
                  >
                    <li className="mb-2">
                      <Link
                        className="dropdown-item dropdown-lis"
                        onClick={() => {
                          closeNav();
                          toggleDropdown();
                        }}
                        aria-current="page"
                        to="./profile"
                      >
                        <span style={{ color: "#ffffff" }}>Profile</span>
                      </Link>
                    </li>
                    <li className="mb-2 d-flex align-content-centers">
                      <Link
                        className="dropdown-item dropdown-lis"
                        onClick={() => {
                          closeNav();
                          toggleDropdown();
                        }}
                        aria-current="page"
                        to="./whatsnew"
                      >
                        <span style={{ color: "#ffffff" }}>Whats New!</span>
                      </Link>
                    </li>
                    <li className="mb-2 text-center">
                      <button
                        style={{ width: "90%" }}
                        className="btn btn-danger"
                        onClick={Loggedout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Homenave;
