import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { is_authenticated, refresh_token } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await is_authenticated();
      if(!result.success) {
        console.warn(':: Authentication failed!');
        console.warn(':: Refreshing token......');
        const refresh = await refresh_token();
        setAuthed(refresh.success);
      } else setAuthed(true);
      setLoading(false);
    };
    checkAuth();
  }, [location.pathname]);

  if (loading) return null;

  return authed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
