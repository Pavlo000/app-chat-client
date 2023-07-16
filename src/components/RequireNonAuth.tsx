import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Loader } from './Loader';

type Props = {
  children: React.ReactNode,
}

export const RequireNonAuth: React.FC<Props> = ({ children }) => {
  const { isChecked, user } = useContext(AuthContext);

  if (!isChecked) {
    return <Loader />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {children || <Outlet />}
    </>
  );
};
