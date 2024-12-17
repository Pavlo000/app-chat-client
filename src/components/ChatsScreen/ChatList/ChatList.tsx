import React from 'react';
import { ChatItem } from '../ChatItem';
import { IChat } from '../../../types/IChat';

type Props = {
  chats: IChat[],
}

export const ChatList: React.FC<Props> = ({ chats }) => {

  return (
    <ul className="ScreenList">
      {chats.map(chat => (
        <li className="ScreenList__item" key={chat.id}>
          <ChatItem chat={chat} />
        </li>
      ))}
    </ul>
  );
};
