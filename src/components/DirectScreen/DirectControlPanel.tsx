import { IChat, IUser } from '../../types';

type Props = {
  chat: IChat;
  currentUser: IUser;
};

export const DirectControlPanel: React.FC<Props> = ({ chat, currentUser }) => {
  const receivers = chat.users.filter((user) => user.id !== currentUser.id);

  return (
    <div className="ControlPanel">
      <h2 className="ControlPanel__title">
        {receivers.slice(0, 6).map((receiver) => receiver.firstName + ' ' + receiver.lastName).join(', ')}
        {receivers.length > 6 && '...'}
      </h2>
    </div>
  );
};

