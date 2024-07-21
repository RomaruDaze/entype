import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DevGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [typos, setTypos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const language = location.state?.language || "python";
    fetch("https://sheetdb.io/api/v1/cblskp1ofk60f")
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.map((item: any) => item[language]);
        setWords(wordList);
        setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, [location.state]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/score", { state: { score, typos } });
    }
  }, [timeLeft, navigate, score, typos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        onClick={() => inputRef.current?.focus()}
      >
        <h1 className="text-4xl font-bold mb-8">Entype Coding Mode</h1>
        <div className="flex flex-col items-center justify-center border-2 border-[#000] rounded-lg p-5 px-[10%] w-[calc(50%)]">
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
            style={{ width: `${(timeLeft / 120) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default DevGame;
