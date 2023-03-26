import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../api/config";
import { useEffect, useState } from "react";
import Quiz from "./Quiz";

function FetchQuiz() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    axios
      .get(config.apiUrl + "/quiz/" + quiz_id)
      .then((response) => {
        console.log(response.data.Quiz);
        setQuiz(response.data.Quiz);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      {JSON.stringify(quiz) ? (
        quiz.isactive ? (
          <div>
            <div className="d-flex justify-content-center">
              <div className="mt-2 card border-0 bg-transparent col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-12">
                <div className="card-body">
                  <div>
                    <h1 className="fs-5">
                      Quiz id :{" "}
                      <span style={{ color: "#d2d2d2" }}>{quiz_id}</span>
                    </h1>
                  </div>
                  <div>
                    {quiz?.title && (
                      <div className="">
                        Quiz Name :{" "}
                        <span style={{ color: "#d2d2d2" }}>{quiz.title}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {quiz?.discription && (
                      <div className="">
                        Quiz Description :{" "}
                        <span style={{ color: "#d2d2d2" }}>
                          {quiz.discription}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Quiz questions={quiz.Questions} quiz_id={quiz_id} />
          </div>
        ) : (
          <div className="fs-2 text-danger text-center">The quiz is no longer active</div>
        )
      ) : (
        <div className="fs-2 text-danger text-center">No quiz found</div>
      )}
    </div>
  );
}

export default FetchQuiz;
