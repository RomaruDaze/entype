import React from "react";
import { useNavigate } from "react-router-dom";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Game Mode</h1>
      <div className="flex flex-row space-x-4 ">
        <button
          className="px-20 py-5 bg-blue-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
          onClick={() => {
            console.log("English");
            navigate("/game/eng");
          }}
        >
          English
        </button>
        <button
          className="px-20 py-5 bg-green-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
          onClick={() => {
            console.log("Developers");
            navigate("/game/dev");
          }}
        >
          Coding
        </button>
      </div>
    </div>
  );
};

export default GamePage;
