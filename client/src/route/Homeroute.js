import React, { useState } from "react";
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
import Homenave from "../components/molecule/Homenavbar";
import Pagenotfound from "../pages/404Error";
import OtherProfile from "../pages/Profile/Other_Profile";
import Playground from "../pages/Code/Playground";

export const ProfileContext = React.createContext();

function HomeRoute() {
  const [profile, setProfile] = useState(0);
  return (
    <>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <Homenave />
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
          <Route path="/profile/:user_id" element={<OtherProfile />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </ProfileContext.Provider>
    </>
  );
}

export default HomeRoute;
