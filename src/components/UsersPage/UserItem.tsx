import React, { useContext } from "react";
import { IUser } from "../../types/IUser";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../services/chatService";
import { IChat } from "../../types";

type Props = {
  user: IUser,
}

export const UserItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);

  async function handleClick() {
    if (currentUser) {
      const chat = await chatService.create([currentUser.id, user.id]) as any as IChat;

      navigate(`/direct/${chat.id}`);
    }
  }

  return (
    <>
      {currentUser && (
        <div className="list has-visible-pointer-controls has-hoverable-list-items">
          <div className="list-item">
            <div className="list-item-image">
              <figure className="image is-64x64">
                <img 
                  className="is-rounded" 
                  src={user.avatar} 
                  alt="avatar" 
                  width="64px" 
                  height="64px" 
                />
              </figure>
            </div>

            <div className="list-item-content">
              <div className="list-item-title">{`${user.name} ${user.surname}`}</div>
              <div className="list-item-description">
                {user.email}
              </div>
            </div>

            <div className="list-item-controls">
              <div className="buttons is-right">
                {currentUser.id === user.id ? (
                  <span className="button mx-6">Me</span>
                ) : (
                  <button className="button" onClick={handleClick}>
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                    <span>Send message</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}