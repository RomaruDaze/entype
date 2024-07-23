import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pythonLogo from "../assets/python-logo.svg";
import javaLogo from "../assets/java-logo.svg";
import cLogo from "../assets/c-logo.svg";
import golangLogo from "../assets/golang-logo.svg";
import rustLogo from "../assets/rust-logo.svg";
import typescriptLogo from "../assets/typescript-logo.svg";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [showCardEng, setShowCardEng] = useState(false);
  const [showCardDev, setShowCardDev] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center px-20 py-10">
        <button
          className="absolute top-[20%] left-[20%] px-4 py-2 bg-gray-500 text-white rounded text-xl font-bold transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="text-7xl font-bold mb-[10%]">Game Mode</h1>
        <div className="flex flex-row space-x-4">
          <button
            className="px-20 py-5 bg-blue-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              console.log("English");
              setShowCardEng(true);
            }}
          >
            English
          </button>
          <button
            className="px-20 py-5 bg-green-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              console.log("Developers");
              setShowCardDev(true);
            }}
          >
            Coding
          </button>
        </div>
      </div>
      {showCardEng && (
        <>
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
            onClick={() => setShowCardEng(false)}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 w-[30%] rounded shadow-lg grid grid-cols-1 gap-4 z-20">
            <button
              className="text-2xl font-bold px-4 py-2 bg-green-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/eng", { state: { time: 60 } })
              }
            >
              Easy
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-yellow-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/eng", { state: { time: 90 } })
              }
            >
              Medium
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-red-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/eng", { state: { time: 120 } })
              }
            >
              Hard
            </button>
          </div>
        </>
      )}
      {showCardDev && (
        <>
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
            onClick={() => setShowCardDev(false)}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 w-[30%] rounded shadow-lg grid grid-cols-2 gap-4 z-20">
            <button
              className="text-2xl font-bold px-4 py-2 bg-green-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", { state: { language: "python", time: 90 } })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img src={pythonLogo} alt="Python" className="w-10 h-10" />
                <p>Python</p>
              </div>
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-yellow-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", { state: { language: "java", time: 90 } })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img src={javaLogo} alt="Java" className="w-10 h-10" />
                <p>Java</p>
              </div>
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-purple-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", { state: { language: "c", time: 90 } })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img src={cLogo} alt="C" className="w-10 h-10" />
                <p>C</p>
              </div>
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-[#fef5df] text-blue-500 rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", { state: { language: "golang", time: 90 } })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img src={golangLogo} alt="Golang" className="w-10 h-10" />
                <p>Golang</p>
              </div>
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-gray-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", {
                  state: { language: "typescript", time: 90 },
                })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img
                  src={typescriptLogo}
                  alt="Typescript"
                  className="w-10 h-10"
                />
                <p>Typescript</p>
              </div>
            </button>
            <button
              className="text-2xl font-bold px-4 py-2 bg-red-500 text-white rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                navigate("/entype/game/dev", { state: { language: "rust", time: 90 } })
              }
            >
              <div className="flex flex-row items-center justify-center">
                <img src={rustLogo} alt="Rust" className="w-10 h-10" />
                <p>Rust</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
