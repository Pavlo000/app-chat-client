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
          This app is designed to help you stay connected with your friends and family. 
          You can chat with others, share photos and videos, and stay updated with the latest news. 
          Enjoy a seamless and user-friendly experience with our app.
        </p>
      </div>
    </div>
  );
};
