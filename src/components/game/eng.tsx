import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EngGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/cblskp1ofk60f")
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
      navigate("/score", { state: { score } });
    }
  }, [timeLeft, navigate, score]);

  useEffect(() => {
    inputRef.current?.focus(); 
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === currentWord) {
      setScore(score + currentWord.length);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setInputValue("");
    }
  };

  const renderWord = () => {
    return currentWord.split("").map((char, index) => {
      let color = "white";
      if (index < inputValue.length) {
        color = char === inputValue[index] ? "green" : "red";
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
        <h1 className="text-4xl font-bold mb-8">Entype English Mode</h1>
        <div className="flex flex-col items-center justify-center border-2 border-[#000] rounded-lg p-5 px-[10%] w-[calc(50%)]">
          <p className="text-4xl mb-[20%] mt-[10%] bg-black text-white rounded-lg p-4">
            {renderWord()}
          </p>
          <p className="text-2xl">{timeLeft}s</p>
          <div
            className="bg-green-500 rounded-lg text-center h-4 mt-4"
            style={{ width: `${(timeLeft / 120) * 100}%` }}
          ></div>
          <input
            ref={inputRef}
            className="position-absolute"
            value={inputValue}
            onChange={handleChange}
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </>
  );
};

export default EngGame;
