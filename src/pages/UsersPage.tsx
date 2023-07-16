/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IUser } from '../types/IUser';
import { UserList } from '../components/UsersPage/UserList';
import { Loader } from '../components/Loader';
import { userService } from '../services/userService';
import { ErrorMessage } from '../components/ErrorMessage';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const usersFromServer = await userService.getAll() as any as IUser[];

        setUsers(usersFromServer);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.response?.data?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="title">Users</h1>

      {!error && isLoading ? <Loader /> : <UserList users={users} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
