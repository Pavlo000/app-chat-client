import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HomeScreen: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="Screen">
      <div className="Screen__block">
        {user ? (
          <h2 className="Screen__title">Welcome back, {user.firstName} {user.lastName}</h2>
        ) : (
          <h2 className="Screen__title">Welcome to the app</h2>
        )}

        <p>
          This application is developed for my portfolio to showcase my skills and abilities.
          I have also included all my favorite technologies and libraries here.
          This application is in the development stage and will be constantly updated.
        </p>
      </div>
    </div>
  );
};
