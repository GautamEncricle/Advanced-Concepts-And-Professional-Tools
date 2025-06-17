import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthorized } = useAuth();
    return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
