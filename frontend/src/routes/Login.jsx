import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useUser } from "../contexts/UserContext";


const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and password cannot be empty!");
      return;
    }
    const result = await login(username, password);
    if (result.success) {
      setUser(result.data);
      alert("User Login Successfull.");
      navigate("/");
    } else {
      alert("User Login Failed.");
      location.reload();
    }
  };

  return (
    <div className="bg-fuchsia-950">
      <div className="flex flex-row-reverse min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
          <div className="bg-white p-6 rounded-r-3xl mr-50  shadow-md w-110 h-120">
            <h2 className="text-5xl font-semibold mt-5 mb-5 text-center h-font text-black">BLIXs</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="flex flex-col mt-10"
            >

              <input
                id="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                className="ml-10 mr-10 text-black  border-2 border-gray-800 p-2 rounded mb-4"
              />

          
              <input
                id="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="ml-10 mr-10 text-black border-2 border-gray-800 p-2 rounded mb-4"
              />
              <h3 className=" text-end mr-10 text-black"><a href="#">Forgot password?</a></h3>
              <button 
                type="submit" 
                className="bg-blue-500 text-white text-2xl p-2 mr-10 ml-10 mb-5 mt-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
              <div className="relative w-full flex justify-center">
                <div className="absolute w-3/4 border-t border-gray-500"></div>
              </div>
              <h3 className="h-font text-2xl font-semibold mt-1 text-center text-black">or</h3>
              <h3 className="h-font text-2xl font-semibold mt-1 text-center text-black">Don't have an account? <a className="text-blue-500 h-font" href="/signup">Sign Up</a></h3>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 ">
          <div className="bg-[url('/images/bg.png')] p-6 rounded-l-3xl shadow-md w-120 h-120 bg-[length:520px_650px] bg-no-repeat">
            <div className="flex items-center justify-center mr-8">
              <img src="/images/logo.png" alt="ALGO_TECH" className="m-5 w-20 h-20"></img>
              <span className="text-5xl font-bold text-white h-font">Algo Tech</span>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Login;
