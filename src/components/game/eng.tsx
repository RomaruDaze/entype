import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EngGame: React.FC = () => {
  const location = useLocation();
  const initialTime = location.state?.time || 120;
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [typos, setTypos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SHEETDB_URL}?sheet=words`)
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.map((item: any) => item.word);
        setWords(wordList);
        setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/score", { state: { score, typos } });
    }
  }, [timeLeft, navigate, score, typos]);

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
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        onClick={() => inputRef.current?.focus()}
      >
        <h1 className="text-6xl font-bold mb-8">Entype English Mode</h1>
        <div className="flex flex-col items-center justify-center p-5 px-[10%] w-[calc(50%)]">
          <button
            className="absolute top-[20%] left-[20%]  px-4 py-2 bg-gray-500 text-white rounded text-xl font-bold transform transition-transform duration-300 hover:scale-105"
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
          />
          <p className="text-2xl">{timeLeft}s</p>
          <div
            className="bg-green-500 rounded-lg text-center h-4 mt-4"
            style={{ width: `${(timeLeft / initialTime) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default EngGame;
