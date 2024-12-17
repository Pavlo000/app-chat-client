import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageList } from '../components/DirectScreen/MessageList';
import { IChat, IUser } from '../types';
import { Loader } from '../components/Loader';
import { messageService } from '../services/messageService';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IError } from '../types/IError';
import { ErrorContext } from '../context/ErrorContext';
import { chatService } from '../services/chatService';
import socket from '../socket';
import { DirectControlPanel } from '../components/DirectScreen/DirectControlPanel';
import { MessageSendForm } from '../components/DirectScreen/MessageSendForm';
import { useMessagerHandler } from '../hooks/useMessagerHandler';


export const DirectScreen: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);
  const { chatId } = useParams();
  const [chat, setChat] = useState<IChat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const [,setReceivers] = useState<IUser[]>([]);
  const { messages, setMessages } = useMessagerHandler(currentUser, lastMessageRef);

  useEffect(() => {
    setIsLoading(true);

    if (!currentUser || !chatId) return;

    chatService.getById(chatId)
      .then((chat) => {
        setChat(chat);
        setReceivers(chat.users.filter((user) => user.id !== currentUser.id));
      })
      .catch((error: AxiosError<IError>) => {
        setError(error.response?.data.message || 'Failed to load chat');
      });
  }, [currentUser, chatId]);

  useEffect(() => {
    if (!chat || !currentUser) return;

    messageService.getAllByChatId(chat.id)
      .then((messages) => {
        setMessages(messages);
        setIsLoading(false);

        messages.map((message) => {
          if (message.user.id !== currentUser.id && !message.viewedBy.some((user) => user.id === currentUser.id)) {
            socket.emit('viewMessage', { messageId: message.id, userId: currentUser.id });
          }
        });
      })
      .catch((error: AxiosError<IError>) => {
        setError(error.response?.data.message || 'Failed to load messages');
      });
  }, [chat, currentUser]);


  if (isLoading) return <Loader />;

  return currentUser && chat && (
    <div className="Screen">
      <div className="Screen__block Screen__block--padding-less">
        <div className="Screen__control-panel">
          <DirectControlPanel chat={chat} currentUser={currentUser} />
        </div>
      </div>


      <div className="Screen__block Screen__block--height-full Screen__block--transparent">
        <MessageList user={currentUser} messages={messages} lastMessageRef={lastMessageRef} />
      </div>

      <div className="Screen__block Screen__block--padding-less">

        <MessageSendForm currentUser={currentUser} chat={chat} />
      </div>
    </div>
  );
};
