
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { INotification } from '../types/INotification';
import { AuthContext } from './AuthContext';
import { notificationService } from '../services/notificationService';
import { IErrorResponse } from '../types/IErrorResponse';
import { ErrorContext } from './ErrorContext';
import { AxiosError } from 'axios';

type NotificationsContextType = {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
};

export const NotificationsContext = React.createContext({} as NotificationsContextType);

type Props = {
  children: React.ReactNode;
};

export const NotificationsProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { user } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    if (!user) return;
    notificationService.getAllByUserId(user.id)
      .then((response) => {
        const { data } = response;

        setNotifications(data.items);
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        setError(error.response?.data.message || 'Failed to fetch notifications');
      });
  }, [user]);

  const value = useMemo(
    () => ({
      notifications,
      setNotifications,
    }),
    [notifications]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
