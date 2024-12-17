import { useContext } from 'react';
import { IChat } from '../../../types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import { NotificationsContext } from '../../../context/NotificationsContext';

type Props = {
  chat: IChat;
};

export const ChatItem: React.FC<Props> = ({ chat }) => {
  const { user: currentUser } = useContext(AuthContext);
  const receivers = chat.users.filter((user) => user.id !== currentUser?.id);
  const { notifications } = useContext(NotificationsContext);

  return currentUser && (
    <div className="ChatItem">
      <Link to={`/chats/${chat.id}`} className="ChatItem__link">
        <figure
          className={`ChatItem__figure ChatItem__figure--receivers-${receivers.length}`}
        >
          {receivers.slice(0, 6).map((user) => (
            <img
              key={user.id}
              className="ChatItem__image"
              src={user.avatar || ''}
              alt="avatar"
            />
          ))}
        </figure>

        <div className="ChatItem__content">
          <h4 className="ChatItem__title">
            {receivers.map((user) => `${user.firstName || ''} ${user.lastName || ''}`).join(', ')}
          </h4>
          <div className="ChatItem__description">
            { chat.lastMessage && !notifications.length && (
              <p>
                {chat.lastMessage.user.firstName || ''} {chat.lastMessage.user.lastName || ''}
                : {chat.lastMessage.message}
              </p>
            )}
            { chat.lastMessage && !!notifications.length && (
              <strong>
                ({notifications.length}) {chat.lastMessage.user.firstName || ''} {chat.lastMessage.user.lastName || ''}
                : {chat.lastMessage.message}
              </strong>
            )}
            { !chat.lastMessage && (
              <p>Start talking</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
