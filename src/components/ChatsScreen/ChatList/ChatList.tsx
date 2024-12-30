import React from 'react';
import { ChatItem } from '../ChatItem';
import { IChat } from '../../../types/IChat';
import { IQueryOptions } from '../../../types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '../../Loader';

type Props = {
  userId: string;
  chats: IChat[],
  loadChats: (prevChats: IChat[], userId: string, query: Partial<IQueryOptions>) => void;
  hasMore: boolean; 
  limit: number;
  sortBy: string;
  length: number;
}

export const ChatList: React.FC<Props> = ({ userId, chats, loadChats, hasMore, limit, sortBy, length }) => {

  const handleLoadMore = () => {
    loadChats(chats, userId, { offset: chats.length, limit, sortBy, order: 'desc' });
  };

  return (
    <ul className="ScreenList">
      <InfiniteScroll
        dataLength={length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={(
          <div className="Screen__loader">
            <Loader />
          </div>
        )}
      >
        {chats.map(chat => (
          <li className="ScreenList__item" key={chat.id}>
            <ChatItem chat={chat} />
          </li>
        ))}
      </InfiniteScroll>
    </ul>
  );
};
