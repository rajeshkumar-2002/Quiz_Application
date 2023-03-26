import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Takequiz() {
  const [quizid, setQuizid] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/quiz/" + quizid);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <div className="mt-5 card border-0 bg-transparent col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12">
          <div className="card-body">
            <h1 className="fs-1 text-color-headding">Take quiz</h1>
            <form onSubmit={handlesubmit}>
              <div className="form-group pt-4">
                <label htmlFor="quizid" className="fs-6 text-color-subheadding">
                  Quiz id
                </label>
                <input
                  id="quizid"
                  type="text"
                  className="form-control auth-input"
                  onChange={(e) => {
                    setQuizid(e.target.value);
                  }}
                  placeholder="sample-quizid"
                  value={quizid}
                  required
                />
              </div>
              <input
                className="btn auth-btn mt-4"
                style={{ width: "100%" }}
                type="submit"
                value="Start"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Takequiz;
