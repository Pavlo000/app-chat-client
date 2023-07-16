/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { IChat } from "../../types";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { IUser } from "../../types";

type Props = {
  chat: IChat,
}

export const ChatItem: React.FC<Props> = ({ chat }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [receiver, setReceiver] = useState<IUser | null>(null);

  useEffect(() => {
    if (currentUser) {
      setReceiver(chat.users.find(user => currentUser.id !== user.id) || null);
    }
  }, []);

  return (
    <>
      {receiver && currentUser && (
        <div className="list has-overflow-ellipsis">
          <Link to={`/direct/${chat.id}`} className="list-item">
            <div className="list-item-image">
              <figure className="image is-64x64">
                <img className="is-rounded" src={receiver.avatar} alt="avatar" />
              </figure>
            </div>

            <div className="list-item-content">
              <div className="list-item-title">{receiver.name}</div>
              <div className="list-item-description">
                {!chat?.lastMessage && (
                  <p>start talking</p>
                )}
                {receiver.id === chat.lastMessage?.userId && (
                  <p>{receiver.name}: {chat.lastMessage.label}</p>
                )}
                {currentUser.id === chat.lastMessage?.userId && (
                  <p>{receiver.name}: {chat.lastMessage.label}</p>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}