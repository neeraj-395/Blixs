import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { is_authenticated, logout }  from "../services/auth";

const Navbar = () => {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      const result = await is_authenticated();
      setUserLogin(result.success);
    };
    handleAuth();
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      alert("Logged out successfully!");
      setUserLogin(false);
    } else {
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <nav className="bg-gray-800 w-50 h-screen flex-col px-3 py-4 fixed left-0 top-0 hidden md:flex">
        <Link to="/" className="mb-6 flex items-center space-x-2 hover:opacity-80">
          <img
            className="h-8 w-8"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
          />
          <span className="h-font text-xl font-bold text-white">BLIXs</span>
        </Link>

        <Link to="/" className="text-white my-4 hover:text-gray-400 flex items-center space-x-2">
          <span>🏠</span>
          <span>Home</span>
        </Link>

        {userLogin ? (
          <>
            <Link to="/user" className="text-white my-4 hover:text-gray-400 flex items-center space-x-2">
            <span>👤</span>
            <span>User</span>
            </Link>
            <Link onClick={handleLogout} className="text-white my-4 hover:text-gray-400 flex items-center space-x-2">
            <span>🚪</span>
            <span>Log Out</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white my-4 hover:text-gray-400 flex items-center space-x-2">
            <span>🔑</span>
            <span>Login</span>
            </Link>
            <Link to="/signup" className="text-white my-4 hover:text-gray-400 flex items-center space-x-2">
            <span>✍️</span>
            <span>Sign Up</span>
            </Link>
          </>
        )}
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="bg-gray-800 fixed bottom-0 w-full flex justify-around items-center py-3 md:hidden">
        <Link to="/" className="text-white hover:text-gray-400">
        <span>🏠</span>
        <span>Home</span>
        </Link>

        {userLogin ? (
          <>
            <Link to="/user-page" className="text-white hover:text-gray-400">
            <span>👤</span>
            <span>Profile</span>
            </Link>

            <Link onClick={handleLogout} className="text-white hover:text-red-400">
            <span>🚪</span>
            <span>Log Out</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-400">
            <span>🔑</span>
            <span>Login</span>
            </Link>
            
            <Link to="/signup" className="text-white hover:text-gray-400">
            <span>✍️</span>
            <span>Sign Up</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
