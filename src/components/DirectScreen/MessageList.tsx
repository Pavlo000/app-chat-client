import cn from 'classnames';
import { IMessage } from '../../types/IMessage';
import { MessageItem } from './MessageItem';
import { IChat, IUser } from '../../types';

type Props = {
  messages: IMessage[];
  lastMessageRef: React.RefObject<HTMLLIElement | null>;
  user: IUser;
  chat: IChat;
};

export const MessageList: React.FC<Props> = ({ user, messages, lastMessageRef, chat }) => {
  const handleListItemClassName = (isAuthor: boolean) => cn('MessageList__item', { 'MessageList__item--author': isAuthor });
  const isGroup = chat.users.length > 2;

  return (
    <ul className="MessageList">
      {messages.map((message, index) => {
        const isAuthor = user.id === message.user.id;

        return messages.length - 1 === index ? (
          <li
            key={message.id}
            className={handleListItemClassName(isAuthor)}
            ref={lastMessageRef}
          >
            <MessageItem message={message} isAuthor={isAuthor} isGroup={isGroup} />
          </li>
        ) : (
          <li
            key={message.id}
            className={handleListItemClassName(isAuthor)}
          >
            <MessageItem message={message} isAuthor={isAuthor} isGroup={isGroup} />
          </li>
        );
      })}
    </ul>
  );
};
