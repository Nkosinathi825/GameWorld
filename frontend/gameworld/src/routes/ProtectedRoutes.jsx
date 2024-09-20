import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  return user?.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
