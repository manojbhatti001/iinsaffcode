import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  // Check if the user's role is in the allowed roles
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if not allowed
  }
  
  return element; // Render the requested component if allowed
};

export default ProtectedRoute;
