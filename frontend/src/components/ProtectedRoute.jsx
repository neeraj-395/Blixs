import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { is_authenticated } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await is_authenticated();
      setAuthed(result.success);
      setLoading(false);
    };
    checkAuth();
  }, [location.pathname]);

  if (loading) return null; // Or a spinner

  return authed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
