import React from 'react';
import { IUser } from '../../../types/IUser';
import { UserItem } from '../UserItem';
import { Loader } from '../../Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IQueryOptions } from '../../../types';


type Props = {
  users: IUser[];
  loadUsers: (prevUsers: IUser[], params: Partial<IQueryOptions>) => void;
  hasMore: boolean;
  limit: number;
  length: number;
  sortBy: string;
};

export const UserList: React.FC<Props> = ({ users, loadUsers, hasMore, limit, length, sortBy }) => {

  const handleLoadMore = () => {
    loadUsers(users, { offset: length, limit, sortBy });
  };

  return (
    <InfiniteScroll
      className="ScreenList"
      dataLength={length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={(
        <div className="Screen__loader">
          <Loader />
        </div>
      )}
      scrollableTarget="scrollableDiv"
    >
      {users.map((user) => (
        <li key={user.id} className="ScreenList__item">
          <UserItem user={user} />
        </li>
      ))}
    </InfiniteScroll>
  );
};

