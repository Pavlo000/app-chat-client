import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageList } from '../components/DirectScreen/MessageList';
import { IChat, IMessage, IQueryOptions, IUser } from '../types';
import { Loader } from '../components/Loader';
import { messageService } from '../services/messageService';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../types/IErrorResponse';
import { ErrorContext } from '../context/ErrorContext';
import { chatService } from '../services/chatService';
import socket from '../socket';
import { DirectControlPanel } from '../components/DirectScreen/DirectControlPanel';
import { MessageSendForm } from '../components/DirectScreen/MessageSendForm';
import { useMessagerHandler } from '../hooks/useMessagerHandler';
import { loadQuery } from '../utils/loadQuery';
import InfiniteScroll from 'react-infinite-scroll-component';


export const DirectScreen: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);
  const { chatId } = useParams();
  const [chat, setChat] = useState<IChat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [length, setLength] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const [,setReceivers] = useState<IUser[]>([]);
  const { messages, setMessages } = useMessagerHandler({
    user: currentUser as IUser,
    setLength,
    lastMessageRef,
  });
  const limit = 10;

  const loadMessages = async (quite: boolean, userId: string, chatId: string, loadedMessages: IMessage[], query: Partial<IQueryOptions>) => {
    return await loadQuery<IMessage, string>(messageService.getAllByChatIdQuery, query, chatId)
      .then((messagesFromServer) => {
        const { data } = messagesFromServer;

        data.items.forEach((message) => {
          if (message.user.id !== userId && !message.viewedBy.some((user) => user.id === userId)) {
            socket.emit('viewMessage', { messageId: message.id, userId });
          }
        });

        setMessages([...data.items, ...loadedMessages], quite);
        setLength(loadedMessages.length + data.total);
        setHasMore(data.total === limit);
      })
    .catch((error: AxiosError<IErrorResponse>) => {
      setError(error.response?.data?.message || 'Failed to load messages');
    });
  };

  const handleLoadMore = (userId: string, chatId: string) => {
    return () => {
      loadMessages(true, userId, chatId, messages, { offset: length, limit });
    };
  };

  useEffect(() => {
    setIsLoading(true);

    if (!currentUser || !chatId) return;

    chatService.getById(chatId)
      .then((response) => {
        const { data } = response;

        setChat(data);
        setReceivers(data.users.filter((user) => user.id !== currentUser.id));
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        setError(error.response?.data.message || 'Failed to load chat');
      });
  }, [currentUser, chatId]);

  useEffect(() => {
    setIsLoading(true);

    if (!chat || !currentUser) return;

    loadMessages(false, currentUser.id, chat.id, [], { limit })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chat, currentUser]);

  return (
    <div className="Screen">
      {isLoading || !currentUser || !chat ? <Loader /> : (
        <>
          <div className="Screen__block Screen__block--padding-less">
            <div className="Screen__control-panel">
              <DirectControlPanel chat={chat} currentUser={currentUser} />
            </div>
          </div>

          <div className="Screen__block Screen__block--height-full Screen__block--transparent">
            <div
              className="Screen__scrollable"
              id="chatScrollable"
            >
              <InfiniteScroll
                dataLength={length}
                next={handleLoadMore(currentUser.id, chat.id)}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                hasMore={hasMore}
                loader={(
                  <div className="Screen__loader">
                    <Loader />
                  </div>
                )}
                scrollableTarget="chatScrollable"
                >
                  <MessageList
                    user={currentUser}
                    chat={chat}
                    messages={messages}
                    lastMessageRef={lastMessageRef}
                  />
              </InfiniteScroll>
            </div>
          </div>

          <div className="Screen__block Screen__block--padding-less">
            <MessageSendForm
              currentUser={currentUser}
              chat={chat}
            />
          </div>
        </>
      )}
    </div>
  );
};
