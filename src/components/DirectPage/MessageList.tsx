import cn from "classnames";
import { IMessage } from "../../types/IMessage"
import { MessageItem } from "./MessageItem";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { IUser } from "../../types/IUser";

type Props = {
  messages: IMessage[],
}

export const MessageList: React.FC<Props> = ({ messages }) => {
  const user = useContext(AuthContext).user as IUser;

  return (
    <ul>
      {messages.map(message => {
        const isAuthor = user.id === message.userId;

        return (
          <li key={message.id} className={cn({ 'has-text-right': isAuthor })}>
            <MessageItem message={message} />
          </li>
        )
      })}
    </ul>
  );
}