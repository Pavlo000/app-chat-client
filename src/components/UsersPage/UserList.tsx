import React from "react";
import { IUser } from "../../types/IUser";
import { UserItem } from "./UserItem";

type Props = {
  users: IUser[],
}

export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  );
}