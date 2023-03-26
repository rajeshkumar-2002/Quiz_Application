import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = ({ questions, quiz_id }) => {
  let navigate = useNavigate();
  const [currentQuestion, setcurrentQuestion] = useState(questions[0]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [Timer, setTimer] = useState(questions[0]?.time * 1000 || 0);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [score, setScore] = useState(0);
  const [final, setFinal] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave the quiz?";
  };

  const handleUnload = () => {
    navigate("/Quiz");
    window.location.href = "/";
  };

  const [totalScore, setTotalScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let score = 0;
    let time = 0;

    for (let question of questions) {
      const questionScore = question.score ? parseInt(question.score) : 1;
      const questionTime = question.time ? parseInt(question.time) : 1;

      score += questionScore;
      time += questionTime;
    }

    // console.log(score, time);
    setTotalScore(score);
    setTotalTime(time);
  }, [questions]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentQuestionIndex !== questions.length - 1) {
        checkAnswer();
        setTimeTaken(
          timeTaken + parseInt((currentQuestion.time * 1000 - Timer) / 1000)
        );
        console.log("timeout", timeTaken);
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setcurrentQuestion(questions[currentQuestionIndex + 1]);
        setTimer(questions[currentQuestionIndex + 1]?.time * 1000 || 0);
      } else if (currentQuestionIndex === questions.length - 1) {
        if (!final) {
          lastQustion();
        }
      }
    }, Timer * 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, Timer]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(Timer - 1000);
    }, 1000);
    if (final) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [Timer]);

  const lastQustion = () => {
    setTimeTaken(
      timeTaken + parseInt((currentQuestion.time * 1000 - Timer) / 1000)
    );
    console.log("last", timeTaken);
    checkAnswer();
  };

  const handleNext = () => {
    setTimeTaken(
      timeTaken + parseInt((currentQuestion.time * 1000 - Timer) / 1000)
    );
    console.log("next", timeTaken);
    checkAnswer();
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    setcurrentQuestion(questions[currentQuestionIndex + 1]);
    setTimer(questions[currentQuestionIndex + 1]?.time * 1000 || 0);
  };

  const handleSingleClick = (option) => {
    setSelectedSingle(option);
  };

  const checkAnswer = () => {
    // Compare two Array
    const compareArrays = (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b);
    };

    // For Single Answer (Radio)
    if (currentQuestion.type === "radio") {
      const correctAnswer = currentQuestion.options
        .filter((option) => option.isAnswer)
        .map((option) => option.value);
      if (correctAnswer[0] === selectedSingle) {
        setScore(score + parseInt(currentQuestion?.score || 1));
      } else {
        // console.log("false");
      }
    }

    // For Multiple Answer (Checkbox)
    else if (currentQuestion.type === "checkbox") {
      const correctAnswer = currentQuestion.options
        .filter((option) => option.isAnswer)
        .map((option) => option.value);
      if (compareArrays(correctAnswer.sort(), selectedMultiple.sort())) {
        setScore(score + parseInt(currentQuestion?.score || 1));
      } else {
        // console.log(false);
      }
    }

    // For Text Answer
    else if (currentQuestion.type === "text") {
      const correctAnswer = currentQuestion.options[0].value;
      const isCasesensitive = currentQuestion.options[0].isCasesensitive;
      if (isCasesensitive) {
        if (correctAnswer === selectedText) {
          setScore(score + parseInt(currentQuestion?.score || 1));
        } else {
          // console.log("false")
        }
      } else {
        if (correctAnswer.toLowerCase() === selectedText.toLowerCase()) {
          setScore(score + parseInt(currentQuestion?.score || 1));
        } else {
          // console.log("non false");
        }
      }
    }

    if (currentQuestionIndex === questions.length - 1) {
      setFinal(true);
    }
    setSelectedMultiple([]);
    setSelectedSingle(null);
    setSelectedText("");
  };

  const handleMultipleClick = (value) => {
    const newSelectedOptions = [...selectedMultiple];
    if (newSelectedOptions.includes(value)) {
      newSelectedOptions.splice(newSelectedOptions.indexOf(value), 1);
    } else {
      newSelectedOptions.push(value);
    }
    setSelectedMultiple(newSelectedOptions);
  };

  const handleTextClick = (option) => {
    setSelectedText(option);
  };

  const RenderQuestion = () => {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div
            className="mt-5 card border-0 col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-12"
            style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p>
                  <b>{currentQuestionIndex + 1}</b>
                  <span>/{questions.length}</span>
                </p>
                <p>
                  {Timer / 1000 <= 5 ? (
                    <span className="badge text-bg-danger">
                      Time: {Timer / 1000}
                    </span>
                  ) : (
                    <span className="badge text-bg-secondary">
                      Time: {Timer / 1000}
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="fs-5">{currentQuestion.question}</p>
                {currentQuestion.note !== "" && (
                  <p className="fs-6">
                    Note :{" "}
                    <span style={{ color: "#D2D2D2" }}>
                      {currentQuestion.note}
                    </span>
                  </p>
                )}
                {currentQuestion.type !== "text" && (
                  <p>
                    <b className="fs-6">Option's :</b>
                  </p>
                )}
                {currentQuestion.type === "radio" &&
                  currentQuestion.options.map((key, index) => {
                    const isSelected = selectedSingle === key.value;
                    return (
                      <div key={index}>
                        <button
                          style={{ width: "100%" }}
                          className={
                            isSelected
                              ? `btn cust-quiz-btn-active mt-3`
                              : `btn cust-quiz-btn mt-3`
                          }
                          onClick={() => handleSingleClick(key.value)}
                        >
                          {key.value}
                        </button>
                      </div>
                    );
                  })}
                {currentQuestion.type === "checkbox" &&
                  currentQuestion.options.map((key, index) => {
                    const isSelected = selectedMultiple.includes(key.value);
                    return (
                      <div key={index}>
                        <button
                          className={
                            isSelected
                              ? `btn cust-quiz-btn-active mt-3`
                              : `btn cust-quiz-btn mt-3`
                          }
                          onClick={() => handleMultipleClick(key.value)}
                          style={{ width: "100%" }}
                        >
                          {key.value}
                        </button>
                      </div>
                    );
                  })}
                {currentQuestion.type === "text" && (
                  <div>
                    {currentQuestion.options[0].isCasesensitive ? (
                      <p>
                        <span className="badge text-bg-danger">
                          It is CaseSensitive
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span className="badge text-bg-success">
                          It is not CaseSensitive
                        </span>
                      </p>
                    )}
                    <div>
                      <input
                        type="text"
                        className="form-control ct-quiz-input"
                        value={selectedText}
                        onChange={(e) => handleTextClick(e.target.value)}
                        placeholder="Enter your answer"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-end mt-5">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={lastQustion}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gameOver = () => {
    navigate("/quiz/" + quiz_id + "/leaderboard", {
      state: {
        Time: timeTaken,
        Score: score,
        Ttime: totalTime,
        Tscore: totalScore,
      },
    });
  };

  return (
    <div className="container">{!final ? RenderQuestion() : gameOver()}</div>
  );
};

export default Quiz;
