import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import App from './App';
import { NotificationsProvider } from './context/NotificationsContext';

import './styles/index.scss';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <ErrorProvider>
    <AuthProvider>
      <NotificationsProvider>
        <Router>
          <App />
        </Router>
      </NotificationsProvider>
    </AuthProvider>
  </ErrorProvider>
);