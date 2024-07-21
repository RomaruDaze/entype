import React, { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  wpm: number;
  accuracy: number;
}

const LDPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/cblskp1ofk60f?sheet=score")
      .then((response) => response.json())
      .then((data) => {
        const fetchedPlayers = data.map((player: any) => ({
          id: player.id,
          name: player.name,
          wpm: player.wpm,
          accuracy: player.acc,
        }));
        const sortedPlayers = fetchedPlayers.sort((a: any, b: any) => {
          if (b.wpm === a.wpm) {
            return b.accuracy - a.accuracy;
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
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">WPM</th>
            <th className="text-left">Accuracy</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {players.map((player) => (
            <tr key={player.id}>
              <td className="text-left">{player.name}</td>
              <td className="text-left">{player.wpm}</td>
              <td className="text-left">{player.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LDPage;
