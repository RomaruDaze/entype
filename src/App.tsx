import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import GamePage from "./components/Game";
import LDPage from "./components/Leaderboard";
import SettingPage from "./components/Settings";
import EngGame from "./components/game/eng";
import DevGame from "./components/game/dev";
import ScorePage from "./components/Score";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboards" element={<LDPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/game/eng" element={<EngGame />} />
        <Route path="/game/dev" element={<DevGame />} />
      </Routes>
    </Router>
  );
};

export default App;
