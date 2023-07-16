import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';
import { IUser } from '../types/IUser';
import socket from '../socket';

type Credentials = { email: string; password: string };
type UserDetails = { name: string, surname: string, avatar?: string };
type AuthResponse = { accessToken: string, user: IUser };

type AuthContextType = {
  isChecked: boolean;
  user: IUser | null;
  checkAuth: () => Promise<void>;
  activate: (activationToken: string, userDetails: UserDetails) => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken: string, userDetails: UserDetails) {
    const { accessToken, user } =
      await authService.activate(activationToken, userDetails) as any as AuthResponse;

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh() as any as AuthResponse;

      accessTokenService.save(accessToken);

      setUser(user);

    } catch (error) {
      socket.disconnect();
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login(credentials: { email: string; password: string }) {

    const { accessToken, user } = await authService.login(credentials) as any as AuthResponse;

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function loginWithGoogle() {
    const { accessToken, user } = await authService.loginWithGoogle() as any as AuthResponse;

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);

    socket.disconnect();
  }

  const value = useMemo(() => ({
    isChecked,
    user,
    checkAuth,
    activate,
    login,
    loginWithGoogle,
    logout,
  }), [user, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
