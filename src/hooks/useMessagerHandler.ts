import { useEffect, useState } from 'react';
import socket from '../socket';
import { IMessage, IUser } from '../types';

type Props = {
  user: IUser;
  setLength: (prevLength: React.SetStateAction<number>) => void;
  lastMessageRef: React.RefObject<HTMLLIElement | null>;
};

export const useMessagerHandler = ({ user, setLength, lastMessageRef }: Props) => {
  const [messages, onSetMessages] = useState<IMessage[]>([]);
  let quite = false;

  const setMessages = (messages: React.SetStateAction<IMessage[]>, q = false) => {
    quite = q;
    onSetMessages(messages);
  };

  useEffect(() => {
    const onReceiveMessage = (message: IMessage) => {
      if (message.user.id !== user.id && !message.viewedBy.some((user) => user.id === user.id)) {
        socket.emit('viewMessage', { messageId: message.id, userId: user.id });
      }

      setLength((prevLength: number) => prevLength + 1);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [messages]);

  useEffect(() => {
    return () => {
      if (!quite) {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }, [messages]);

  return {
    messages,
    setMessages,
  };
};