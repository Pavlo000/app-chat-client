import cn from 'classnames';
import { IMessage } from '../../types/IMessage';
import { normalizeDate } from '../../utils/normalizeDate';

type Props = {
  message: IMessage;
  isAuthor: boolean;
};

export const MessageItem: React.FC<Props> = ({ message, isAuthor }) => {
  const date = normalizeDate(new Date(message.createdAt));

  const handleMessageFigureClassName = (isAuthor: boolean) => cn('MessageItem__figure', { 'MessageItem__figure--author': isAuthor });

  return (
    <div className="MessageItem">
      <figure className={handleMessageFigureClassName(isAuthor)}>
        <img 
          className="MessageItem__image"
          src={message.user.avatar} 
          alt={message.user.firstName + ' ' + message.user.lastName} 
        />
        <figcaption className="MessageItem__caption">
          <div className="MessageItem__block">
            <h4 className="MessageItem__name">
              {message.user.firstName + ' ' + message.user.lastName}
            </h4>
            <p className="MessageItem__message">
              {message.message}
            </p>
          </div>
          <p className="MessageItem__date">
            {date}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};
