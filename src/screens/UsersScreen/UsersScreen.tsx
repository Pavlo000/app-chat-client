import { useContext, useEffect, useState } from 'react';
import { IUser } from '../../types/IUser';
import { UserList } from '../../components/UsersScreen/UserList';
import { Loader } from '../../components/Loader';
import { userService } from '../../services/userService';
import { AxiosError } from 'axios';
import { IError } from '../../types/IError';
import { usePageError } from '../../hooks/usePageError';
import { AuthContext } from '../../context/AuthContext';
import { UserControlPanel } from '../../components/UsersScreen/UserControlPanel';


export const UsersScreen: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = usePageError();

  useEffect(() => {
    setIsLoading(true);
    userService.getAll()
      .then((usersFromServer) => {
        const usersExludeCurrentUser = usersFromServer.filter(
          (user) => user.id !== currentUser?.id
        );
        setUsers(usersExludeCurrentUser);
        setIsLoading(false);
      })
      .catch((error: AxiosError<IError>) => {
        setError(error.response?.data?.message || 'Failed to load users');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="Screen">
      <div className="Screen__block Screen__block--padding-less">
        <div className="Screen__control-panel">
          <UserControlPanel users={users} setUsers={setUsers} />
        </div>
      </div>
      <div className="Screen__block Screen__block--height-full">
        {isLoading ? (
          <div className="Screen__loader">
            <Loader />
          </div>
        ) : (
          <div className="Screen__list">
            <UserList users={users} />
          </div>
        )}
      </div>
    </div>
  );
};
