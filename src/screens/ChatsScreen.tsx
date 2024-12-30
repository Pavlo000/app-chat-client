import { useContext, useEffect, useState } from 'react';
import { ChatList } from '../components/ChatsScreen/ChatList';
import { Loader } from '../components/Loader';
import { IChat, IQueryOptions } from '../types';
import { chatService } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { usePageError } from '../hooks/usePageError';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../types/IErrorResponse';
import { ChatControlPanel } from '../components/ChatsScreen/ChatControlPanel';
import { loadQuery } from '../utils/loadQuery';

export const ChatsScreen: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<IChat[] | []>([]);
  const [length, setLength] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = usePageError();
  const limit = 10;
  const sortBy = 'createdAt';

  const loadChats = async (prevChats: IChat[], userId: string, query: Partial<IQueryOptions>) => {
    return await loadQuery<IChat, string>(chatService.getAllQuery, query, userId)
      .then((chatsFromServer) => {
        const { data } = chatsFromServer;

        setChats(prevChats.concat(data.items));
        setLength(prevChats.length + data.total);
        setHasMore(data.total === limit);
      })
    .catch((error: AxiosError<IErrorResponse>) => {
      setError(error.response?.data?.message || 'Failed to load chats');
    });
  };

  useEffect(() => {
    setIsLoading(true);

    if (!currentUser) return;

    loadChats([], currentUser.id, { limit, sortBy, order: 'desc' })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser]);

  return currentUser ? (
    <div className="Screen">
      <div className="Screen__block Screen__block--padding-less">
        <div className="Screen__control-panel">
          <ChatControlPanel
            userId={currentUser.id}
            loadChats={loadChats}
            limit={limit}
            sortBy={sortBy}
          />
        </div>
      </div>
      <div className="Screen__block Screen__block--height-full">
        {isLoading ? (
          <div className="Screen__loader">
            <Loader />
          </div>
        ) : (
          <div className="Screen__list">
            <ChatList 
              userId={currentUser.id}
              chats={chats} 
              loadChats={loadChats}
              hasMore={hasMore}
              limit={limit}
              length={length}
              sortBy={sortBy}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
};
