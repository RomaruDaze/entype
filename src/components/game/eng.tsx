import React, { useState, useEffect, useRef } from "react";

const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

const EngGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      alert(`Time's up! Your score is ${score}`);
    }
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === currentWord) {
      setScore(score + 1);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setInputValue("");
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Entype 英語モード</h1>
        <div className="flex flex-col items-center justify-center border-2 border-[#000] rounded-lg p-5 px-[10%]">
          <p className="text-4xl mb-[20%] mt-[10%] bg-black text-white rounded-lg p-4">
            {currentWord}
          </p>
          <input
            ref={inputRef}
            className="text-4xl mb-[25%] px-[20%] py-[3%] text-center rounded-lg"
            value={inputValue}
            onChange={handleChange}
          />
          <p className="">Time : {timeLeft}s</p>
          <p className="">Score : {score}pt</p>
        </div>
      </div>
    </>
  );
};

export default EngGame;
