import React, { useEffect, useState } from "react";
import { getlocalstorage } from "../../localstorage";
import axios from "axios";
import config from "../../api/config";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/molecule/Loader";

const EditQuiz = () => {
  const email = getlocalstorage("user").user_email;
  const [quiz, setQuiz] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(config.apiUrl + "/editquiz/" + email)
      .then((response) => {
        // console.log(response.data.Quizzes);
        setQuiz(response.data.Quizzes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredQuizzes([]);
      return;
    }

    const filtered = quiz.filter(
      (quiz) =>
        quiz._id.includes(searchQuery.toLowerCase()) ||
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [searchQuery, quiz]);

  const handleSearch = () => {
    setFilteredQuizzes([]);
    setSearchQuery(searchQuery.toLowerCase());
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card border-0 bg-transparent col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12">
          <h1 className="fs-4 text-center">Quiz List</h1>
          <div className="card-body">
            <div className="mb-3 input-group">
              <input
                type="text"
                className="form-control ct-quiz-input"
                placeholder="Search by quiz ID or name"
                value={searchQuery}
                style={{ backgroundColor: "#3E3E3E" }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div>
                {" "}
                {!quiz && <div className="text-center mt-5">No quiz found</div>}
                {(searchQuery ? filteredQuizzes : quiz) &&
                  (searchQuery ? filteredQuizzes : quiz).map((quiz) => (
                    <div
                      key={quiz._id}
                      className="mt-3 card border-0"
                      style={{
                        backgroundColor: "#3E3E3E",
                        borderRadius: "16px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        onClick={() => {
                          navigate("/editquiz/" + quiz._id);
                        }}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="m-3">
                          <p className="fs-6">
                            Quiz id :{" "}
                            <span style={{ color: "#E4E0E0" }}>{quiz._id}</span>
                          </p>
                          <p className="fs-6">
                            Quiz title :{" "}
                            <span style={{ color: "#E4E0E0" }}>
                              {quiz.title}
                            </span>
                          </p>
                          <p className="fs-6">
                            Quiz description :{" "}
                            <span style={{ color: "#E4E0E0" }}>
                              {quiz.discription}
                            </span>
                          </p>
                          <div className="form-check">
                            <input
                              disabled={true}
                              className="form-check-input"
                              id="isactive"
                              type="checkbox"
                              role="switch"
                              checked={quiz.isactive}
                            />
                            <label htmlFor="isactive" className="fs-6">
                              Is Active
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
