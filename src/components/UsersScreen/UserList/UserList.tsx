import React from 'react';
import { IUser } from '../../../types/IUser';
import { UserItem } from '../UserItem';

type Props = {
  users: IUser[];
};

export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul className="ScreenList">
      {users.map((user) => (
        <li key={user.id} className="ScreenList__item">
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  );
};
