import cn from 'classnames';
import { IMessage } from '../../types/IMessage';
import { MessageItem } from './MessageItem';
import { IUser } from '../../types';

type Props = {
  messages: IMessage[];
  lastMessageRef: React.RefObject<HTMLLIElement>;
  user: IUser;
};

export const MessageList: React.FC<Props> = ({ user, messages, lastMessageRef }) => {
  const handleListItemClassName = (isAuthor: boolean) => cn('MessageList__item', { 'MessageList__item--author': isAuthor });

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
            <MessageItem message={message} isAuthor={isAuthor} />
          </li>
        ) : (
          <li
            key={message.id}
            className={handleListItemClassName(isAuthor)}
          >
            <MessageItem message={message} isAuthor={isAuthor} />
          </li>
        );
      })}
    </ul>
  );
};
