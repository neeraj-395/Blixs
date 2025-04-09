import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and password cannot be empty!");
      return;
    }
    try {
      const success = await login(username, password);
      if (success){
        alert("Login Success!");
      }else{
        alert("Login Failed!");
      }
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col"
        >
          <label htmlFor="username" className="mb-1 font-medium">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className="border p-2 rounded mb-4"
          />

          <label htmlFor="password" className="mb-1 font-medium">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="border p-2 rounded mb-4"
          />

          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
