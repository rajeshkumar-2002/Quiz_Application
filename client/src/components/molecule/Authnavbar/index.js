import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

function Authnav() {
  function closeNav() {
    document.querySelector(".navbar-collapse").classList.remove("show");
  }
  return (
    <div className="container sticky-top" style={{ backgroundColor: "black" }}>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        <div className="container-fluid">
          <Link className="navbar-brand" to="./">
            <img src={logo} width="80" height="80" alt="" />
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 column-gap-4 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeNav}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./" onClick={closeNav}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="https://www.instagram.com/mr.s.i.x_2k2/"
                >
                  <span
                    style={{ color: "#4267B2", fontSize: "20px" }}
                    className="bi bi-facebook"
                  ></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="https://www.instagram.com/mr.s.i.x_2k2/"
                >
                  <span
                    style={{ color: "#C13584", fontSize: "20px" }}
                    className="bi bi-instagram"
                  ></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="https://www.instagram.com/mr.s.i.x_2k2/"
                >
                  <span
                    style={{ color: "#00acee", fontSize: "20px" }}
                    className="bi bi-twitter"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Authnav;
