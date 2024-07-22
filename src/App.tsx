import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import GamePage from "./components/Game";
import LDPage from "./components/Leaderboard";
import EngGame from "./components/game/eng";
import DevGame from "./components/game/dev";
import ScorePage from "./components/Score";
import SignInPage from "./components/Signin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/entype/" element={<HomePage />} />
        <Route path="/entype/game" element={<GamePage />} />
        <Route path="/entype/leaderboards" element={<LDPage />} />
        <Route path="/entype/score" element={<ScorePage />} />
        <Route path="/entype/game/eng" element={<EngGame />} />
        <Route path="/entype/game/dev" element={<DevGame />} />
        <Route
          path="/entype/signin"
          element={<SignInPage onLogin={() => {}} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
