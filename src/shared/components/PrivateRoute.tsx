import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import Loading from './Loading';

interface PrivateRouteProps {
  children: React.JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  return loading ? <Loading /> : (!user) ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
