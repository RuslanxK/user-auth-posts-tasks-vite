import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = () => {
  const isAuthenticated = useAuth(); 
  return isAuthenticated ? <Navigate to="/login" /> : <Outlet /> 
};

export default PublicRoute;
