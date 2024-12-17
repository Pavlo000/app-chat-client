import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';
import { IUser } from '../types/IUser';
type Credentials = { email: string; password: string };
type UserDetails = { firstName: string; lastName: string; avatar?: string };

type AuthContextType = {
  isChecked: boolean;
  user: IUser | null;
  checkAuth: () => Promise<void>;
  activate: (
    activationToken: string,
    userDetails: UserDetails
  ) => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  setUser: (user: IUser | null) => void;
  logout: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isChecked, setChecked] = useState(false);

  async function activate(activationToken: string, userDetails: UserDetails) {
    const { accessToken, user } = await authService.activate(
      activationToken,
      userDetails
    );

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);

      setUser(user);
    } catch {
      console.log('User is not authenticated');
    } finally {
      setChecked(true);
    }
  }

  async function login(credentials: { email: string; password: string }) {
    const { accessToken, user } = await authService.login(credentials);

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isChecked,
      user,
      setUser,
      checkAuth,
      activate,
      login,
      logout,
    }),
    [user, isChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
