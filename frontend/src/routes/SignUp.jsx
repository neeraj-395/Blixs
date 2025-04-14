import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    const result = await register(formData);

    if (result) {
      alert('Registration successful!');
      navigate("/login");
    } else {
      alert('Registration failed!');
      location.reload();
    }
  };

  return (
    <>
    <div className="bg-fuchsia-950">
    <div className ="flex flex-row-reverse min-h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-r-3xl shadow-lg w-110 h-130">
        <h2 className="text-3xl font-bold mt-0 mb-6 text-center h-font">Sign Up</h2>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
      
            <input type="text" name="first_name" placeholder="First Name" required onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="w-1/2">
           
            <input type="text" name="last_name" placeholder="Last Name" required onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <input type="text" name="username" placeholder="Username" required onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <input type="password" name="confirm_password" placeholder="Confirm Password" required onChange={handleChange} className="w-full p-2 border rounded mb-6" />

        <button type="submit" className=" w-full bg-blue-500 text-white fw-bold py-2 rounded hover:bg-blue-600 mb-3 h-font">Register</button>

        <div className="relative w-full flex justify-center">
          <div className="absolute w-3/4 border-t border-gray-900"></div>
        </div>
        <h3 className="h-font text-2xl font-semibold mt-1 text-center text-black">or</h3>
        <h3 className="h-font text-2xl font-semibold  text-center text-black">alrerady have an account? <a className="text-blue-500 h-font" href="/login">Login</a></h3>
      </form>
    </div>
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 ">
          <div className="bg-[url('/Images/bg-img.png')] p-6 rounded-l-3xl shadow-md w-120 h-130 bg-[length:520px_650px] bg-no-repeat">
            <div className="flex items-center">
              <img src="/Images/ALGO_TECH.png" alt="ALGO_TECH" className="rounded-full m-5 w-20 h-20"></img>
              <span className="text-3xl font-bold text-white h-font">BLIXs</span>
            </div>
            <h2 className="text-5xl font-semibold mt-28 text-center text-white h-font">Welcome Page</h2>
            <h3 className="text-2xl font-semibold text-center mt-35 text-white h-font">Create your account now<br/>to enjoy exciting world of Blixs</h3>
          </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default SignUp;
