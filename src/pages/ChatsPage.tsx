import React, { useContext, useEffect, useState } from 'react';
import { ChatList } from '../components/ChatsPage/ChatList';
import { Loader } from '../components/Loader';
import { IChat } from '../types';
import { chatService } from '../services/chatService';
import { AuthContext } from '../components/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';


export const ChatsPage: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<IChat[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          setIsLoading(true);
          const chatsFromServer = await chatService.getAll(currentUser.id) as any as IChat[];

          setChats(chatsFromServer);
          setIsLoading(false);
        } catch (error: any) {
          setError(error.response?.data?.message);
          setIsLoading(false);
        }

      })();
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="title">Chats</h1>

      {!error && isLoading ? <Loader /> : <ChatList chats={chats} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}