import { IMessage } from "../../types/IMessage";

type Props = {
  message: IMessage,
}

export const MessageItem: React.FC<Props> = ({ message }) => {
  const timestamp = new Date(message.createdAt);
  const normalizeDate = timestamp.toLocaleString('default', { month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric' });

  return (
    <div>
      <div className="box has-background-white is-inline-block mb-0 p-3">
        <p className="pr-2">
          {message.label}
        </p>
      </div>
      <p className="help mx-3 mb-2">{normalizeDate}</p>
    </div>
  );
}