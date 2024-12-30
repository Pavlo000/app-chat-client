import { useEffect, useState } from 'react';
import socket from '../socket';
import { sessionService } from '../services/sessionService';
import { IUser } from '../types/IUser';

export const useSocketConnection = (user: IUser | null) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let onConnect: () => void;
    let onDisconnect: () => void;

    if (user && !isConnected) {
      onConnect = () => {
        console.log('Session ID: ', socket.id);
        sessionService.create(user.id, socket.id!);
        setIsConnected(true);
      };

      socket.on('connect', onConnect);
      socket.connect();
    } else if (!user && isConnected) {
      onDisconnect = () => {
        setIsConnected(false);
      };

      socket.on('disconnect', onDisconnect);
      socket.disconnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user, isConnected]);
};
