import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout_try, is_authenticated } from "../endpoints/Api";

const Navbar = () => {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await is_authenticated();
      setUserLogin(result);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    const success = await logout_try();
    if (success) {
      alert("Logged out successfully!");
      setUserLogin(false);
    } else {
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <nav className="bg-gray-800 w-20 h-screen flex-col items-center py-4 fixed left-0 top-0 hidden md:flex">
        <Link to="/" className="mb-6">
          <img
            className="h-8 w-8"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
          />
        </Link>

        <Link to="/" className="text-white my-4 hover:text-gray-400">🏠</Link>

        {userLogin ? (
          <>
            <Link to="/user-page" className="text-white my-4 hover:text-gray-400">👤</Link>
            <button onClick={handleLogout} className="text-white my-4 hover:text-red-400">🚪</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white my-4 hover:text-gray-400">🔑</Link>
            <Link to="/signup" className="text-white my-4 hover:text-gray-400">✍️</Link>
          </>
        )}
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="bg-gray-800 fixed bottom-0 w-full flex justify-around items-center py-3 md:hidden">
        <Link to="/" className="text-white hover:text-gray-400">🏠</Link>

        {userLogin ? (
          <>
            <Link to="/user-page" className="text-white hover:text-gray-400">👤</Link>
            <button onClick={handleLogout} className="text-white hover:text-red-400">🚪</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-400">🔑</Link>
            <Link to="/signup" className="text-white hover:text-gray-400">✍️</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
