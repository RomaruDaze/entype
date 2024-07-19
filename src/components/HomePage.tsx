import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Entype</h1>
      <div className="flex flex-col space-y-4 ">
        <button
          className="px-12 py-5 bg-blue-500 text-white rounded"
          onClick={() => {
            console.log("Start");
          }}
        >
          Start
        </button>
        <button
          className="px-12 py-5 bg-gray-500 text-white rounded"
          onClick={() => {
            console.log("Leaderboards");
          }}
        >
          Leaderboards
        </button>
        <button
          className="px-12 py-5 bg-red-500 text-white rounded"
          onClick={() => {
            console.log("Exit");
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default HomePage;
