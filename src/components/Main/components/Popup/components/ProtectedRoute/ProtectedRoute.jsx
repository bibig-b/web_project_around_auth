import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  const isAuthenticated = loggedIn;
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
