import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateQuiz from "../pages/Createquiz";
import Takequiz from "../pages/Takequiz";
import FetchQuiz from "../pages/Takequiz/components/Fetch";
import EditQuiz from "../pages/Editquiz";
import Update_Quiz from "../pages/Editquiz/components/Update";
import Profile from "../pages/Profile";
import GameOver from "../pages/Takequiz/components/Gameover";
import Report from "../pages/Editquiz/components/Reports";

function HomeRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/quiz" element={<Takequiz />} />
        <Route path="/quiz/:quiz_id" element={<FetchQuiz />} />
        <Route path="/quiz/:quiz_id/leaderboard" element={<GameOver />} />
        <Route path="/editquiz" element={<EditQuiz />} />
        <Route path="/editquiz/:quiz_id" element={<Update_Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report/:quiz_id" element={<Report />} />
      </Routes>
    </>
  );
}

export default HomeRoute;
