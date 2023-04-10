import image from "../../assets/images/404.png";
import { Link } from "react-router-dom";

function NotloginQuiz() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card border-0 bg-transparent col-xxl-7 col-xl-8 col-lg-9 col-md-12 col-12">
          <div>
            <div
              style={{ position: "relative" }}
              className="d-flex justify-content-center"
            >
              <img
                src={image}
                alt="Your Image"
                style={{
                  width: "200px",
                  animation: "moveUpDown 3s ease-in-out infinite",
                }}
              />
              <style>
                {`
          @keyframes moveUpDown {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
              </style>
            </div>
          </div>
          <div>
            <h2 className="fs-3 text-color-headding">Please do login to take the quiz.</h2>
            <p
              style={{ textAlign: "justify" }}
              className="text-color-subheadding pt-3"
            >
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <Link className="btn auth-btn" to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotloginQuiz;
