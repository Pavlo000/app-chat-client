import { useContext } from 'react';
import { IUser } from '../../../types';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { chatService } from '../../../services/chatService';
import { ErrorContext } from '../../../context/ErrorContext';
import { IError } from '../../../types/IError';
import { AxiosError } from 'axios';
import defaultAvatar from '../../../assets/profile.jpg';


type Props = {
  user: IUser;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  function handleClick() {
    if (currentUser) {
      chatService.createOrGet([currentUser.id, user.id])
        .then((chat) => {
          navigate(`/chats/${chat.id}`);
        })
        .catch((error: AxiosError<IError>) => {
          setError(error.response?.data?.message || 'Unable to create chat');
        });
    }
  }

  return currentUser && (
    <div className="UserItem">
      <figure className="UserItem__figure">
        <img
          className="UserItem__image"
          src={user.avatar || defaultAvatar}
          alt="avatar"
          width="64px"
          height="64px"
        />
      </figure>

      <div className="UserItem__content">
        <h4 className="UserItem__title">{`${user.firstName} ${user.lastName}`}</h4>
        <div className="UserItem__description">{user.email}</div>
      </div>

      <div className="UserItem__controls">
        <button className="UserItem__button" onClick={handleClick}>
          <i className="UserItem__button--icon fa fa-edit"></i> Send message
        </button>
      </div>
    </div>
  );
};
