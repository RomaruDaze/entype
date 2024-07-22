import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/entype-logo.png";
import Modal from "./Modal/Modal";
import SignInPage from "./Signin";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="flex flex-row items-center justify-center text-7xl font-bold mb-8">
        <img src={logo} alt="Entype" className="w-20 h-20 mr-4" />
        <span className="text-green-500">En</span>Type
      </h1>
      {loggedInUser && (
        <p className="text-4xl mb-4 text-bold">{loggedInUser}</p>
      )}
      <div className="flex flex-col items-center justify-center px-20 py-10 rounded-lg">
        <div className="flex flex-col space-y-4">
          <button
            className="px-20 py-5 bg-blue-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              navigate("/entype/game");
            }}
          >
            Start
          </button>
          <button
            className="px-20 py-5 bg-red-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              navigate("/entype/leaderboards", { state: { loggedInUser } });
            }}
          >
            Leaderboards
          </button>
          {loggedInUser ? (
            <button
              className="px-20 py-5 bg-gray-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-20 py-5 bg-green-500 text-white rounded text-2xl font-bold transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <SignInPage
          onLogin={(username) => {
            setLoggedInUser(username);
            localStorage.setItem("loggedInUser", username);
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
