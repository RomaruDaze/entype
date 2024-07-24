import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loadingGif from "../../assets/loadingcat.gif";

const DevGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [typos, setTypos] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initialTime = location.state?.time || 90; // Default to 90 seconds if not provided
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const language = location.state?.language || "python";
    fetch(`${import.meta.env.VITE_SHEETDB_URL}?sheet=words`)
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.map((item: any) => item[language]);
        setWords(wordList);
        setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, [location.state]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft: number) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      navigate("/entype/score", {
        state: { score, typos, timer: initialTime },
      });
    }
  }, [timeLeft, gameStarted, navigate, score, typos, initialTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !gameStarted) {
        setGameStarted(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === currentWord) {
      setScore(score + currentWord.length);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setInputValue("");
    } else {
      const typoCount = value.split("").reduce((acc, char, index) => {
        return acc + (char !== currentWord[index] ? 1 : 0);
      }, 0);
      setTypos(typos + typoCount);
    }
  };

  const renderWord = () => {
    return currentWord.split("").map((char, index) => {
      let color = "grey";
      if (index < inputValue.length) {
        color = char === inputValue[index] ? "#39FF14" : "red";
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col fixed inset-0  flex items-center justify-center z-50">
          <img
            src={loadingGif}
            alt="Loading..."
            style={{ width: "auto", height: "200px" }}
          />
          <p className="text-4xl">Loading...</p>
        </div>
      ) : (
        <>
          {!gameStarted && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
              <p className="text-white text-4xl">
                Press{" "}
                <span className="text-green-500 border-2 border-green-500 rounded-lg px-3 py-1">
                  Space
                </span>{" "}
                to Start
              </p>
            </div>
          )}
          <div
            className="flex flex-col items-center justify-center min-h-screen"
            onClick={() => inputRef.current?.focus()}
          >
            <h1 className="text-6xl font-bold mb-8">Entype Coding Mode</h1>
            <div className="flex flex-col items-center justify-center p-5 px-[10%] w-[calc(50%)]">
              <button
                className="absolute top-[20%] left-[20%] px-4 py-2 bg-gray-500 text-white rounded text-xl font-bold transform transition-transform duration-300 hover:scale-105"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <p className="text-4xl mb-[20%] mt-[10%] bg-black rounded-lg p-4">
                {renderWord()}
              </p>
              <input
                ref={inputRef}
                className="text-4xl mb-[15%] py-[3%] text-center rounded-lg w-[calc(150%)]"
                value={inputValue}
                onChange={handleChange}
                disabled={!gameStarted}
              />
              <p className="text-2xl">{timeLeft}s</p>
              <div
                className="bg-green-500 rounded-lg text-center h-4 mt-4"
                style={{ width: `${(timeLeft / initialTime) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DevGame;
