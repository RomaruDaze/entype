import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state || { score: 0 }; 

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold py-4">Your score is {score}</h1>
      <div className="flex flex-col justify-center gap-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/game")}
        >
          Play Again
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
