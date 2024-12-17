import { IChat } from './IChat';
import { IMessage } from './IMessage';
import { IUser } from './IUser';

export interface INotification {
  id: string;
  message: IMessage;
  chat: IChat;
  user: IUser;
}

