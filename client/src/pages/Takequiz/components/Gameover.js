import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../api/config";
import { getlocalstorage } from "../../../localstorage";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function GameOver() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const Score = location.state.Score;
  const Tscore = location.state.Tscore;
  const Ttime = location.state.Ttime;
  const Time = location.state.Time;
  const [leaderboard, setLeaderBoard] = useState();
  const [currentUser, setcurrentUser] = useState();

  useEffect(() => {
    axios
      .post(config.apiUrl + "/get_name", {
        email: getlocalstorage("user").user_email,
      })
      .then((main_response) => {
        setcurrentUser({
          user_email: getlocalstorage("user").user_email,
          quiz_id: quiz_id,
          score: Score,
          max_score: Tscore,
          time: Time,
          max_time: Ttime,
          name: main_response.data.name,
          profile_pic: main_response.data.profile_pic,
        });
        axios
          .post(config.apiUrl + "/score", {
            Score: {
              user_email: getlocalstorage("user").user_email,
              quiz_id: quiz_id,
              score: Score,
              max_score: Tscore,
              time: Time,
              max_time: Ttime,
              name: main_response.data.name,
              profile_pic: main_response.data.profile_pic,
            },
          })
          .then((sec_response) => {
            // console.log(response.data);
            axios
              .get(config.apiUrl + "/leaderboard/" + quiz_id)
              .then((response) => {
                let data = response.data.scores;
                const json = JSON.parse(data.replace(/'/g, '"'));
                setLeaderBoard(json);
                console.log(json);
              })
              .catch((error) => {
                console.log(error.response);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let top3 = leaderboard?.slice(0, 3);
  let others = leaderboard?.slice(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = others?.slice(indexOfFirstItem, indexOfLastItem);

  let currentUserRank;
  if (currentUser) {
    currentUserRank = leaderboard?.findIndex(
      (item) => item.user_email === currentUser.user_email
    );
  }

  const displayUserRow =
    currentUserRank !== -1 &&
    currentUserRank - 3 >= indexOfLastItem &&
    (currentUserRank !== 1 || currentUserRank !== 2 || currentUserRank !== 3);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <p className="fs-6 text-center">Quiz id : {quiz_id}</p>
      {leaderboard && (
        <div className="d-flex justify-content-center">
          <div
            className="mt-3 card border-0 col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-12"
            style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
          >
            <div className="card-body">
              <h1 className="fs-4 pb-3">Leaderboard</h1>
              <div className="d-flex flex-row align-items-center justify-content-between flex-wrap mb-5">
                {top3.map((score, index) => (
                  <div key={index} className="align-items-center">
                    <div className="text-center">
                      <p>#{index + 1}</p>
                    </div>
                    <div
                      className="mt-3 card border-0 p-4 justify-content-center"
                      style={{
                        backgroundColor:
                          score.user_email !== currentUser.user_email
                            ? "#808080"
                            : "#8A2BE2",
                        borderRadius: "16px",
                        width: "180px",
                        height: "200px",
                      }}
                    >
                      <div
                        className="card-body d-flex flex-column align-items-center"
                        style={{ width: "100%" }}
                      >
                        <div className="">
                          <img
                            src={score?.profile_pic}
                            className="rounded-circle shadow-4 d-none d-md-block"
                            style={{ width: "50px" }}
                            alt="Avatar"
                          />
                        </div>
                        <div className="flex-fill text-truncate">
                          {score.name}
                        </div>
                        <div className="flex-fill text-truncate">
                          {score.score}
                        </div>
                        <div
                          style={{ fontSize: "13px", color: "#E4E0E0" }}
                          className="pt-4"
                        >
                          {score.time} sec
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {currentItems.map((score, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="text-nowrap pe-2 pt-4">
                    <p>#{indexOfFirstItem + index + 4}</p>
                  </div>
                  <div
                    className="mt-3 card border-0"
                    style={{
                      backgroundColor:
                        indexOfFirstItem + index + 3 !== currentUserRank
                          ? "#808080"
                          : "#8A2BE2",
                      borderRadius: "16px",
                      width: "95%",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between p-2">
                      <div className="pe-3">
                        <img
                          src={score?.profile_pic}
                          className="rounded-circle shadow-4 d-none d-md-block"
                          style={{ width: "50px" }}
                          alt="Avatar"
                        />
                      </div>
                      <div className="flex-fill text-truncate">
                        <div className="fs-6">{score.name}</div>
                        <div style={{ fontSize: "13px", color: "#E4E0E0" }}>
                          {score.time} sec
                        </div>
                      </div>
                      <div className="mt-3 me-2">
                        <p className="fs-6 ">{score.score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-3">.....</div>
              {displayUserRow && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-nowrap pe-2 pt-4">
                    <p>#{currentUserRank + 1}</p>
                  </div>
                  <div
                    className="mt-3 card border-0"
                    style={{
                      backgroundColor: "#8A2BE2",
                      borderRadius: "16px",
                      width: "95%",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between p-2">
                      <div className="pe-3">
                        <img
                          src={currentUser?.profile_pic}
                          className="rounded-circle shadow-4 d-none d-md-block"
                          style={{ width: "50px" }}
                          alt="Avatar"
                        />
                      </div>
                      <div className="flex-fill text-truncate">
                        <div className="fs-6">{currentUser.name}</div>
                        <div style={{ fontSize: "13px", color: "#E4E0E0" }}>
                          {currentUser.time} sec
                        </div>
                      </div>
                      <div className="mt-3 me-2">
                        <p className="fs-6 ">{currentUser.score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-primary me-2"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleNextPage}
                  disabled={indexOfLastItem >= leaderboard.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameOver;
