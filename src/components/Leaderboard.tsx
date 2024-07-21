import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Player {
  id: string;
  username: string;
  wpm: number;
  accuracy: string;
}

const LDPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state?.loggedInUser || null;
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = fetch(
      `${import.meta.env.VITE_SHEETDB_URL}?sheet=score`
    ).then((response) => response.json());
    const fetchUsernames = fetch(
      `${import.meta.env.VITE_SHEETDB_URL}?sheet=player`
    ).then((response) => response.json());

    Promise.all([fetchScores, fetchUsernames]).then(([scoreData, userData]) => {
      const userMap = userData.reduce((acc: any, user: any) => {
        acc[user.id] = user.username;
        return acc;
      }, {});

      const fetchedPlayers = scoreData.map((player: any) => ({
        id: player.id,
        username: userMap[player.id] || "Unknown",
        wpm: parseFloat(player.wpm),
        accuracy: player.acc,
      }));

      const sortedPlayers = fetchedPlayers.sort((a: any, b: any) => {
        if (b.wpm === a.wpm) {
          return parseFloat(b.accuracy) - parseFloat(a.accuracy);
        }
        return b.wpm - a.wpm;
      });

      setPlayers(sortedPlayers);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="absolute top-[20%] left-[20%] px-4 py-2 bg-gray-500 text-white rounded text-xl font-bold transform transition-transform duration-300 hover:scale-105"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="flex flex-col items-center justify-center w-[50%] h-[40%] p-4">
        <h1 className="text-7xl font-bold mb-4">Leaderboard</h1>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border text-2xl">Rank</th>
              <th className="text-left p-2 border text-2xl">Name</th>
              <th className="text-left p-2 border text-2xl">WPM</th>
              <th className="text-left p-2 border text-2xl">Accuracy</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {players.map((player: Player, index: number) => (
              <tr
                key={player.id}
                className={
                  player.id === loggedInUser ? "bg-green-200" : ""
                }
              >
                <td className="text-left p-2 border text-bold text-2xl">{index + 1}</td>
                <td className="text-left p-2 border text-bold text-2xl">{player.username}</td>
                <td className="text-left p-2 border text-bold text-2xl">{player.wpm}</td>
                <td className="text-left p-2 border text-bold text-2xl">{player.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LDPage;
