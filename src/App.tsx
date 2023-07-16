/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';

import socket from './socket';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { UsersPage } from './pages/UsersPage';
import { HomePage } from './pages/HomePage';
import { usePageError } from './hooks/usePageError';
import { ChatsPage } from './pages/ChatsPage';

import { AuthContext } from './components/AuthContext';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/RequireAuth';
import { Loader } from './components/Loader';
import { DirectPage } from './pages/DirectPage';
import { ErrorMessage } from './components/ErrorMessage';

const App: React.FC = () => {
  const { isChecked, checkAuth } = useContext(AuthContext);
  const [error, setError] = usePageError('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    socket.emit('error');
    socket.on('error', (error) => {
      setError(error.message);
    });

    return () => {
      socket.off('error');
    };
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <>
      <Navbar setError={setError} />

      <main>
        <section className="section">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="login" element={<LoginPage />} />

            <Route path="/" element={<RequireAuth />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="chats" element={<ChatsPage />} />
              <Route path="direct/:chatId" element={<DirectPage />} />
            </Route>
          </Routes>
        </section>

        {error && <ErrorMessage error={error} />}
      </main>
    </>
  );
}

export default App;
