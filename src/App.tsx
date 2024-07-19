import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import LDPage from "./components/LDPage";
import SettingPage from "./components/SettingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/GamePage" element={<GamePage />} />
        <Route path="/LDPage" element={<LDPage />} />
        <Route path="/SettingPage" element={<SettingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
