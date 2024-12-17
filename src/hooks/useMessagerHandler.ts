import { useEffect, useState } from 'react';
import socket from '../socket';
import { IMessage, IUser } from '../types';

export const useMessagerHandler = (user: IUser | null, lastMessageRef: React.RefObject<HTMLLIElement>) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    let onReceiveMessage: (message: IMessage) => void;

    if (user) {
      onReceiveMessage = (message: IMessage) => {
        if (message.user.id !== user.id && !message.viewedBy.some((user) => user.id === user.id)) {
          socket.emit('viewMessage', { messageId: message.id, userId: user.id });
        }

        setMessages((prevMessages) => [...prevMessages, message]);
      };
      socket.on('receiveMessage', onReceiveMessage);
    }

    return () => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [messages]);

  return {
    messages,
    setMessages,
  };
};