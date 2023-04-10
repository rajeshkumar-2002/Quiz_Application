import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [Quiz, setQuiz] = useState([
    {
      image:
        "https://t3.ftcdn.net/jpg/03/30/86/14/360_F_330861430_Sy9xGjDh43Hr7lakI3goYATg3fkOaXyt.jpg",
      name: "Create quiz",
      link: "/createquiz",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/006/140/088/non_2x/design-of-quiz-in-gradient-color-question-and-answers-template-quiz-game-in-tv-show-vector.jpg",
      name: "Take quiz",
      link: "/quiz",
    },
    {
      image:
        "https://cdn.vectorstock.com/i/preview-1x/57/98/question-mark-line-icon-online-quiz-test-sign-vector-43505798.jpg",
      name: "Edit quiz",
      link: "/editquiz",
    },
  ]);

  const [Form, setForm] = useState([
    {
      image:
        "https://t3.ftcdn.net/jpg/03/30/86/14/360_F_330861430_Sy9xGjDh43Hr7lakI3goYATg3fkOaXyt.jpg",
      name: "Create Form",
      link: "/createquiz",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/006/140/088/non_2x/design-of-quiz-in-gradient-color-question-and-answers-template-quiz-game-in-tv-show-vector.jpg",
      name: "Edit Form",
      link: "/quiz",
    },
  ]);

  return (
    <div>
      <div className="container">
        <h2 className="fs-3 mx-3 mt-4">Hot Topics</h2>
        <div
          className="d-flex flex-row mb-3 overflow-scroll scrollbar d-grid gap-5"
        >
          {Quiz.map((item, index) => (
            <Link
              key={index}
              className="p-2"
              to={item.link}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              <div
                className="card border-0 bg-transparent"
                style={{
                  width: "18rem",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={item.image}
                  className="img-fluid card-img-top"
                  alt="img"
                  style={{ borderRadius: "16px", height: "180px" }}
                />
                <div className="card-body bg-transparent ">
                  <p className="card-text text-center fs-6">{item.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="fs-3 mx-3 mt-4">General Form</h2>
        <div
          className="d-flex flex-row mb-3 overflow-scroll scrollbar d-grid gap-5"
        >
          {Form.map((item, index) => (
            <Link
              key={index}
              className="p-2"
              to={item.link}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              <div
                className="card border-0 bg-transparent"
                style={{
                  width: "18rem",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={item.image}
                  className="img-fluid card-img-top"
                  alt="img"
                  style={{ borderRadius: "16px", height: "180px" }}
                />
                <div className="card-body bg-transparent ">
                  <p className="card-text text-center fs-6">{item.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
