import { useEffect, useContext } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import { AuthContext } from '../context/AuthContext';
import { INotification } from '../types/INotification';
import socket from '../socket';

export const useNotificationHandler = () => {
  const { user } = useContext(AuthContext);
  const { setNotifications } = useContext(NotificationsContext);

  useEffect(() => {
    let onReceiveNotification: (notification: INotification) => void;
    let onRemoveNotification: (notificationId: string) => void;

    if (user) {
      onReceiveNotification = (notification: INotification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      };

      onRemoveNotification = (notificationId: string) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
      };

      socket.on('receiveNotification', onReceiveNotification);
      socket.on('removeNotification', onRemoveNotification);
    }

    return () => {
      socket.off('receiveNotification', onReceiveNotification);
      socket.off('removeNotification', onRemoveNotification);
    };
  }, [user, setNotifications]);
};