import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, typos, timer } = location.state || {
    score: 0,
    typos: 0,
    timer: 1,
  };
  const loggedInUser = localStorage.getItem("loggedInUser");

  const [lps, setLps] = useState(0);
  const [acc, setAcc] = useState(0);

  useEffect(() => {
    const calculatedLps = score / timer;
    const calculatedAcc = score > 0 ? ((score - typos) / score) * 100 : 0;
    setLps(calculatedLps);
    setAcc(calculatedAcc);
    console.log(`LPS: ${calculatedLps}, Accuracy: ${calculatedAcc}`);

    const fetchData = async () => {
      if (loggedInUser) {
        try {
          const response = await fetch(
            `https://sheetdb.io/api/v1/cblskp1ofk60f?sheet=score&id=${loggedInUser}`
          );
        
          const data = await response.json();
          const existingScore = data[0]?.lps || 0;
          if (score > existingScore) {
            const patchResponse = await fetch(
              `https://sheetdb.io/api/v1/cblskp1ofk60f?sheet=score`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: loggedInUser,
                  lps: calculatedLps,
                  acc: calculatedAcc,
                }),
              }
            );
            if (patchResponse.status === 405) {
              console.error("PATCH method not allowed.");
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [score, typos, loggedInUser, timer]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold py-4">LPS: {lps}</h1>
      <p className="text-4xl font-bold py-4">Accuracy: {acc.toFixed(2)} %</p>
      <div className="flex flex-col justify-center gap-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/entype/game")}
        >
          Play Again
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/entype/")}
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
