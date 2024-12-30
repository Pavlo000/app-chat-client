import { useEffect, useState } from 'react';
import { IUser } from '../types/IUser';
import { UserList } from '../components/UsersScreen/UserList';
import { Loader } from '../components/Loader';
import { userService } from '../services/userService';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../types/IErrorResponse';
import { usePageError } from '../hooks/usePageError';
import { UserControlPanel } from '../components/UsersScreen/UserControlPanel';
import { IQueryOptions } from '../types';
import { loadQuery } from '../utils/loadQuery';

export const UsersScreen: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [, setError] = usePageError();
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;
  const sortBy = 'email';

  const loadUsers = async (prevUsers: IUser[], query: Partial<IQueryOptions>) => {
    return await loadQuery<IUser, string>(userService.getAllQuery, query)
      .then((usersFromServer) => {
        const { data } = usersFromServer;

        setUsers(prevUsers.concat(data.items));
        setLength(prevUsers.length + data.total);
        setHasMore(data.total === limit);
      })
    .catch((error: AxiosError<IErrorResponse>) => {
      setError(error.response?.data?.message || 'Failed to load users');
    });
  };

  useEffect(() => {
    setIsLoading(true);
    loadUsers([], { limit, sortBy })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="Screen">
      <div className="Screen__block Screen__block--padding-less">
        <div className="Screen__control-panel">
          <UserControlPanel
            loadUsers={loadUsers}
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
          <div className="Screen__list" id="scrollableDiv">
              <UserList 
                users={users} 
                loadUsers={loadUsers}
                hasMore={hasMore}
                limit={limit}
                length={length}
                sortBy={sortBy}
              />
          </div>
        )}
      </div>
    </div>
  );
};
