import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../api/config";
import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import Loader from "../../../components/molecule/Loader";

function FetchQuiz() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState();
  const [loding, setloading] = useState(true);
  const [Starttest, setstarttest] = useState(false);

  useEffect(() => {
    axios
      .get(config.apiUrl + "/quiz/" + quiz_id)
      .then((response) => {
        console.log(response.data.Quiz);
        setQuiz(response.data.Quiz);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);

  return (
    <div>
      {loding ? (
        <>
          <Loader />
        </>
      ) : JSON.stringify(quiz) ? (
        quiz.isactive ? (
          <div  className="container">
            <div className="d-flex justify-content-center">
              <div className="mt-2 card border-0 bg-transparent col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-12">
                {Starttest ? (
                  <Quiz questions={quiz.Questions} quiz_id={quiz_id} />
                ) : (
                  <div className="card-body">
                    <h1 className="fs-2 text-center my-4">About Quiz</h1>
                    <table>
                      <tbody>
                        <tr>
                          <td className="fs-5">Quiz id </td>
                          <td style={{ color: "#d2d2d2" }}> {quiz_id}</td>
                        </tr>
                        <tr>
                          <td className="fs-5">Quiz Name </td>
                          <td style={{ color: "#d2d2d2" }}> {quiz?.title}</td>
                        </tr>
                        <tr>
                          <td className="fs-5">Quiz Description </td>
                          <td style={{ color: "#d2d2d2" }}>
                            {quiz?.discription}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      className="btn auth-btn mt-5"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setstarttest(true);
                      }}
                    >
                      Start
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="fs-2 text-danger text-center">
            The quiz is no longer active
          </div>
        )
      ) : (
        <div className="fs-2 text-danger text-center">No quiz found</div>
      )}
    </div>
  );
}

export default FetchQuiz;
