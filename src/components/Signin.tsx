import { useState } from "react";
import showIcon from "../assets/e-open.png";
import hideIcon from "../assets/e-close.png";

const SignInPage = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    onLogin(userId);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SHEETDB_URL}?sheet=player`
      );
      const data = await response.json();

      const userExists = data.some(
        (user: { id: string; username: string }) =>
          user.id === userId || user.username === username
      );

      if (userExists) {
        setError("User ID or Username already exists");
      } else {
        const postResponse = await fetch(
          `${import.meta.env.VITE_SHEETDB_URL}?sheet=player`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userId,
              password: password,
              username: username,
            }),
          }
        );

        if (postResponse.ok) {
          console.log("Sign-up successful");
          onLogin(username);
        } else {
          setError("Error posting data");
        }
      }
    } catch (error) {
      setError("Error fetching data");
    }
  };

  return (
    <div className="flex flex-col p-5">
      <h2 className="text-2xl font-bold text-center">
        {isSignUp ? "Sign Up" : "Login"}
      </h2>
      <form
        className="flex flex-col items-center justify-center w-full max-w-md p-8 space-y-1 bg-white rounded-lg"
        onSubmit={isSignUp ? handleSignUp : handleSignIn}
      >
        <div className="form-group">
          <p>{isSignUp ? "User id :" : "Username or User id :"}</p>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <p>Username :</p>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <p>Password :</p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              maxLength={16}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? showIcon : hideIcon}
                alt={showPassword ? "Hide" : "Show"}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </div>
        {isSignUp && (
          <div className="form-group">
            <p>Re-enter Password :</p>
            <div className="relative w-full">
              <input
                type={showRePassword ? "text" : "password"}
                maxLength={16}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                <img
                  src={showRePassword ? showIcon : hideIcon}
                  alt={showRePassword ? "Hide" : "Show"}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md transform transition-transform duration-300 hover:scale-105"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        className="mt-4 text-blue-500"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default SignInPage;
