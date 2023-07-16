import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Loader } from './Loader';

type Props = {
  children?: React.ReactNode,
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { isChecked, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isChecked) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children || <Outlet />}
    </>
  );
};
