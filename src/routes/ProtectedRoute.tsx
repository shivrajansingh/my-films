import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  isOnline: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isOnline }) => {
    const location = useLocation();
    return isOnline ? <Outlet /> : <Navigate to="/offline" state={{ from: location.pathname }} />;
};

export default ProtectedRoute;
