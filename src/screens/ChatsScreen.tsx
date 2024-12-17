import { useContext, useEffect, useState } from 'react';
import { ChatList } from '../components/ChatsScreen/ChatList';
import { Loader } from '../components/Loader';
import { IChat } from '../types';
import { chatService } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { usePageError } from '../hooks/usePageError';
import { AxiosError } from 'axios';
import { IError } from '../types/IError';
import { ChatControlPanel } from '../components/ChatsScreen/ChatControlPanel';

export const ChatsScreen: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<IChat[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = usePageError();

  useEffect(() => {
    if (!currentUser) return;

    setIsLoading(true);

    chatService.getAll(currentUser.id)
      .then((chatsFromServer) => {
        setChats(chatsFromServer);
      })
      .catch((error: AxiosError<IError>) => {
        setError(error.response?.data?.message || 'Failed to load chats');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser]);

  return (
    <div className="Screen">
      <div className="Screen__block Screen__block--padding-less">
        <div className="Screen__control-panel">
          <ChatControlPanel chats={chats} setChats={setChats} />
        </div>
      </div>
      <div className="Screen__block Screen__block--height-full">
        {isLoading ? (
          <div className="Screen__loader">
            <Loader />
          </div>
        ) : (
          <div className="Screen__list">
            <ChatList chats={chats} />
          </div>
        )}
      </div>
    </div>
  );
};
