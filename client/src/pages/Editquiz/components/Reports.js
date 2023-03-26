import axios from "axios";
import config from "../../../api/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Report.css";

function Report() {
  const [data, setData] = useState();
  const { quiz_id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [scoreorder, setScoreorder] = useState(true);
  const [timeorder, setTimeorder] = useState(true);

  useEffect(() => {
    axios
      .get(config.apiUrl + "/leaderboard/" + quiz_id)
      .then((response) => {
        let data = response.data.scores;
        const json = JSON.parse(data.replace(/'/g, '"'));
        setData(json);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const filteredData = data
    ? data.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.user_email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const sortedData = filteredData
    ? [...filteredData].sort((a, b) => {
        if (sortBy === "time") {
          if (sortOrder === "asc") {
            return a.time - b.time;
          } else {
            return b.time - a.time;
          }
        } else if (sortBy === "score") {
          if (sortOrder === "asc") {
            return a.score - b.score;
          } else {
            return b.score - a.score;
          }
        } else {
          return 0;
        }
      })
    : [];

  const handleSortClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleResetClick = () => {
    setSearchTerm("");
    setSortBy("");
    setSortOrder("asc");
    setScoreorder(true);
    setTimeorder(true);
  };

  //   https://chat.openai.com/chat/abfd1312-b5d4-4eb5-af53-9308bea6aa5e

  return (
    <div>
      {data && (
        <div className="container">
          <h1 className="text-center bg-transparent text-wrap fs-1 fw-semibold mt-5 mb-3">
            Report
          </h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control ct-quiz-input"
              placeholder="Enter name or email id"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>
          <div className="d-flex mb-3 flex-wrap ">
            <table className="rwd-table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>
                    Score{" "}
                    <span
                      className="btn btn-link text-white"
                      onClick={() => {
                        handleSortClick("score");
                        setScoreorder(!scoreorder);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <i
                        className={
                          scoreorder ? "bi bi-arrow-down" : "bi bi-arrow-up"
                        }
                      ></i>
                    </span>
                  </th>
                  <th>Max Score</th>
                  <th>
                    Time [in sec]
                    <span
                      className="btn btn-link text-white"
                      onClick={() => {
                        handleSortClick("time");
                        setTimeorder(!timeorder);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <i
                        className={
                          timeorder ? "bi bi-arrow-down" : "bi bi-arrow-up"
                        }
                      ></i>
                    </span>
                  </th>
                  <th>Max Time [in sec]</th>
                </tr>
                {sortedData.map((data, index) => (
                  <tr key={index}>
                    <td data-th="#">{index + 1}</td>
                    <td data-th="Name">{data.name}</td>
                    <td data-th="Email">{data.user_email}</td>
                    <td data-th="Score">{data.score}</td>
                    <td data-th="Max Score">{data.max_score}</td>
                    <td data-th="Time [in sec]">{data.time}</td>
                    <td data-th="Max Time [in sec]">{data.max_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;
