import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, typos } = location.state || { score: 0, typos: 0 };
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (loggedInUser) {
      fetch(
        `https://sheetdb.io/api/v1/cblskp1ofk60f?sheet=score&id=${loggedInUser}`
      )
        .then((response) => response.json())
        .then((data) => {
          const existingScore = data[0]?.wpm || 0;
          if (score > existingScore) {
            fetch(`https://sheetdb.io/api/v1/cblskp1ofk60f?sheet=score`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: loggedInUser,
                wpm: score,
                acc: ((score - typos) / score) * 100,
              }),
            });
          }
        });
    }
  }, [score, typos, loggedInUser]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold py-4">Your score is {score}</h1>
      <p className="text-4xl font-bold py-4">Your typos are {typos}</p>
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
