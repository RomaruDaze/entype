import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Entype</h1>
      <div className="flex flex-col space-y-4 ">
        <button
          className="px-20 py-5 bg-blue-500 text-white rounded text-2xl font-bold"
          onClick={() => {
            console.log("Start");
            navigate("/GamePage");
          }}
        >
          Start
        </button>
        <button
          className="px-20 py-5 bg-gray-500 text-white rounded text-2xl font-bold"
          onClick={() => {
            console.log("Leaderboards");
            navigate("/LDPage");
          }}
        >
          Leaderboards
        </button>
        <button
          className="px-20 py-5 bg-red-500 text-white rounded text-2xl font-bold"
          onClick={() => {
            console.log("Exit");
            navigate("/SettingPage");
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default HomePage;
