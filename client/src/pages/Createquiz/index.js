import React, { useState } from "react";
import { getlocalstorage } from "../../localstorage";
import axios from "axios";
import config from "../../api/config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      time: "",
      type: "radio",
      note: "",
      score: "",
      options: [
        {
          value: "",
          isAnswer: false,
        },
        {
          value: "",
          isAnswer: false,
        },
      ],
    },
  ]);

  const [Quiz, setQuiz] = useState({
    title: "",
    discription: "",
    isactive: true,
    user_email: getlocalstorage("user").user_email,
    _id:
      getlocalstorage("user").user_email.split("@")[0] +
      "-" +
      uuidv4().split("-")[0],
  });

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        time: "",
        type: "radio",
        note: "",
        score: "",
        options: [
          {
            value: "",
            isAnswer: false,
          },
          {
            value: "",
            isAnswer: false,
          },
        ],
      },
    ]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    setQuestions(
      questions.filter((question, index) => index !== questionIndex)
    );
  };

  const handleQuestionChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].type = event.target.value;
    updatedQuestions[questionIndex].options.forEach((options) => {
      options.isAnswer = false;
    });
    if (event.target.value === "text") {
      updatedQuestions[questionIndex].options = [
        {
          value: "",
          isAnswer: true,
          isCasesensitive: false,
        },
      ];
    } else if (
      event.target.value === "radio" ||
      event.target.value === "checkbox"
    ) {
      updatedQuestions[questionIndex].options = [
        {
          value: "",
          isAnswer: false,
        },
        {
          value: "",
          isAnswer: false,
        },
      ];
    }
    setQuestions(updatedQuestions);
  };

  const handleTimerChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].time = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleScoreChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].score = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleNoteChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].note = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];

    if (options.length < 5) {
      options.push({
        value: "",
        isAnswer: false,
      });
    }

    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];

    if (options.length > 2) {
      options.splice(optionIndex, 1);
    }

    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex].value = event.target.value;
    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleSingleOptionSelection = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options.forEach((option) => {
      option.isAnswer = false;
    });
    options[optionIndex].isAnswer = true;
    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleMultipleOptionSelection = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex].isAnswer = !options[optionIndex].isAnswer;
    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleisCasesensitive = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex].isCasesensitive =
      !options[optionIndex].isCasesensitive;
    updatedQuestions[questionIndex].options = options;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    questions.forEach((question) => {
      let hasSelectedOption = false;
      question.options.forEach((option) => {
        if (option.isAnswer) {
          hasSelectedOption = true;
        }
      });
      if (!hasSelectedOption) {
        isValid = false;
      }
    });

    if (isValid) {
      if (questions.length !== 0) {
        Quiz.Questions = questions;
        let final = { Quiz: Quiz };
        axios
          .post(config.apiUrl + "/addquiz", final)
          .then((response) => {
            setMessage(
              "Quiz added Successfully the quiz id id :" + response.data.quiz_id
            );
            navigate("/");
          })
          .catch((error) => {
            setMessage("Error While adding the Quiz");
          });
      } else {
        alert("Please add Question");
      }
    } else {
      alert("You missed to select the option for a Question");
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]*$/; // Regular expression to match only numbers

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  return (
    <div className="container">
      <h1 className="fs-2 text-center text-color-headding">Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center pb-5">
          <div
            className="card border-0 col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12"
            style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
          >
            <div className="card-body">
              <div>
                <div className="fs-6 text-color-subheadding">
                  <span style={{ color: "#ffffff" }}>Quiz id :</span>{" "}
                  <span style={{ color: "#d2d2d2" }}>{Quiz._id}</span>
                </div>
                <div>
                  <div className="form-group pt-4">
                    <label htmlFor="title" className="fs-6">
                      Title
                    </label>
                    <input
                      id="title"
                      className="form-control ct-quiz-input"
                      placeholder="Enter title"
                      value={Quiz.title}
                      onChange={(e) => {
                        setQuiz({
                          ...Quiz,
                          title: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label htmlFor="discription" className="fs-6">
                      Description
                    </label>
                    <textarea
                      id="dscription"
                      className="form-control ct-quiz-input"
                      placeholder="Enter description"
                      value={Quiz.discription}
                      onChange={(e) => {
                        setQuiz({
                          ...Quiz,
                          discription: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-check pt-4">
                    <input
                      className="form-check-input"
                      id="isactive"
                      type="checkbox"
                      role="switch"
                      checked={Quiz.isactive}
                      onChange={(e) => {
                        setQuiz({
                          ...Quiz,
                          isactive: !Quiz.isactive,
                        });
                      }}
                    />
                    <label htmlFor="isactive" className="form-check-label fs-6">
                      Is Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center pb-3">
          <div
            className="card border-0 col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12"
            style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
          >
            <div className="card-body">
              <div>
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex}>
                    <div className="d-flex justify-content-between">
                      <p>
                        <b className="fs-6">Question {questionIndex + 1}</b>
                      </p>
                      <div className="form-group">
                        <select
                          className="form-control custom-dropdown"
                          id={questionIndex}
                          value={question.type}
                          onChange={(event) =>
                            handleTypeChange(event, questionIndex)
                          }
                        >
                          <option defaultValue value="radio">
                            Single Answer
                          </option>
                          <option value="checkbox">Multiple Answer</option>
                          <option value="text">Text Answer</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group pt-2">
                      <label htmlFor="question" className="fs-6">
                        Question
                      </label>
                      <textarea
                        id="question"
                        placeholder="Enter question"
                        className="form-control ct-quiz-input"
                        value={question.question}
                        style={{ maxHeight: "250px" }}
                        onChange={(event) =>
                          handleQuestionChange(event, questionIndex)
                        }
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <div className="pe-1 flex-grow-1 form-group">
                        <label htmlFor="timer" className="fs-6">
                          Timer{" "}
                          <i
                            className="bi bi-clock-history"
                            style={{
                              color:
                                parseInt(question?.time || "1") >= 4 &&
                                parseInt(question?.time || "1") <= 60
                                  ? "white"
                                  : "red",
                              fontSize: "12px",
                            }}
                          ></i>
                        </label>
                        <input
                          id="timer"
                          className="form-control ct-quiz-input"
                          type="text"
                          placeholder="Enter Time in seconds [4 - 60]"
                          value={question.time}
                          onChange={(event) =>
                            handleTimerChange(event, questionIndex)
                          }
                          onKeyPress={handleKeyPress}
                          required
                        />
                      </div>
                      <div className="ps-1 flex-grow-1 form-group">
                        <label htmlFor="score" className="fs-6">
                          Score
                        </label>
                        <input
                          id="score"
                          className="form-control ct-quiz-input"
                          type="text"
                          onKeyPress={handleKeyPress}
                          placeholder="Enter Score"
                          value={question.score}
                          onChange={(event) =>
                            handleScoreChange(event, questionIndex)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="note" className="fs-6">
                        Note
                      </label>
                      <input
                        id="note"
                        className="form-control ct-quiz-input"
                        type="text"
                        placeholder="Enter Note (Optional)"
                        value={question.note}
                        onChange={(event) =>
                          handleNoteChange(event, questionIndex)
                        }
                      />
                    </div>

                    {question.options.length !== 0 && (
                      <p className="pt-3 fs-6">Options</p>
                    )}
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        {/* Single Input */}
                        {question.type === "radio" && (
                          <div className="d-flex justify-content-between pb-3 align-items-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                checked={option.isAnswer}
                                onChange={() =>
                                  handleSingleOptionSelection(
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                required
                              />
                            </div>
                            <div className="flex-grow-1 form-group">
                              <input
                                className="form-control ct-quiz-input"
                                type="text"
                                placeholder="Enter option"
                                value={option.value}
                                onChange={(event) =>
                                  handleOptionChange(
                                    event,
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                required
                              />
                            </div>
                            <div
                              onClick={() =>
                                handleRemoveOption(questionIndex, optionIndex)
                              }
                            >
                              <i
                                className="bi bi-x"
                                style={{ fontSize: "30px", cursor: "pointer" }}
                              ></i>
                            </div>
                          </div>
                        )}

                        {/* Multiple Input */}
                        {question.type === "checkbox" && (
                          <div className="d-flex justify-content-between pb-3 align-items-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={option.isAnswer}
                                onChange={() =>
                                  handleMultipleOptionSelection(
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                              />
                            </div>
                            <div className="flex-grow-1 form-group">
                              <input
                                className="form-control ct-quiz-input"
                                type="text"
                                placeholder="Enter option"
                                value={option.value}
                                onChange={(event) =>
                                  handleOptionChange(
                                    event,
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                required
                              />
                            </div>
                            <div
                              onClick={() =>
                                handleRemoveOption(questionIndex, optionIndex)
                              }
                            >
                              <i
                                className="bi bi-x"
                                style={{ fontSize: "30px", cursor: "pointer" }}
                              ></i>
                            </div>
                          </div>
                        )}

                        {/* Text Input */}
                        {question.type === "text" && (
                          <div>
                            <div className="form-group">
                              <input
                                className="form-control ct-quiz-input"
                                type="text"
                                placeholder="Enter option"
                                value={option.value}
                                onChange={(event) =>
                                  handleOptionChange(
                                    event,
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                required
                              />
                            </div>
                            <div className="form-check pt-2">
                              <label htmlFor="case">Is casesensitive</label>
                              <input
                                id="case"
                                className="form-check-input"
                                type="checkbox"
                                checked={option.isCasesensitive}
                                onChange={() =>
                                  handleisCasesensitive(
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="d-flex justify-content-between pt-3">
                      {question.type !== "text" && (
                        <div>
                          <button
                            className="btn cust-sec-btn"
                            type="button"
                            onClick={() => handleAddOption(questionIndex)}
                          >
                            Add option
                          </button>
                        </div>
                      )}

                      <div>
                        <button
                          className="btn cust-danger-btn"
                          type="button"
                          onClick={() => handleRemoveQuestion(questionIndex)}
                        >
                          Remove question
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      className="btn auth-btn"
                      type="button"
                      onClick={handleAddQuestion}
                    >
                      Add question
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-success" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
