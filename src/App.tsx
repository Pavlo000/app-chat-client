import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RequireAuth } from './components/RequireAuth';
import { Loader } from './components/Loader';
import { RequireNonAuth } from './components/RequireNonAuth';
import { GlobalErrorMessage } from './components/ErrorMessage';


// Screens
import { HomeScreen } from './screens/HomeScreen';
import { UsersScreen } from './screens/UsersScreen';
import { ChatsScreen } from './screens/ChatsScreen';
import { DirectScreen } from './screens/DirectScreen';
import { ProfileScreen } from './screens/ProfileScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AccountActivationPage } from './pages/AccountActivationPage';

// Contexts
import { AuthContext } from './context/AuthContext';

// Hooks
import { useSocketConnection } from './hooks/useSocketConnection';
import { useNotificationHandler } from './hooks/useNotificationHandler';

// Styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  const { isChecked, checkAuth, user } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  useSocketConnection(user);
  useNotificationHandler();

  if (!isChecked) {
    return <Loader />;
  }
  return (
    <div className="App">
      {user && (
        <div className="App__sidebar">
          <Sidebar />
        </div>
      )}

      <main className="App__main">
        <header className="App__header">
          <Header />
        </header>

        {!user && (
          <section className="App__page-container">
            <Routes>
              <Route path="/" element={<RequireNonAuth />}>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="sign-up" element={<RegistrationPage />} />
                <Route path="activate/:activationToken" element={<AccountActivationPage />} />
              </Route>
            </Routes>
          </section>
        )}

        {user && (
          <section className="App__screen-container">
            <Routes>
              <Route path="/" element={<RequireAuth />}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="users/" element={<UsersScreen />} />
                <Route path="users/people" element={<UsersScreen />} />
                <Route path="users/ai-models" element={<UsersScreen />} />
                <Route path="chats" element={<ChatsScreen />} />
                <Route path="chats/:chatId" element={<DirectScreen />} />
                <Route path="profile" element={<ProfileScreen />} />
              </Route>
            </Routes>
          </section>
        )}

        <footer className="App__footer">
          <Footer />
        </footer>

        <GlobalErrorMessage />
      </main>
    </div>
  );
};

export default App;
