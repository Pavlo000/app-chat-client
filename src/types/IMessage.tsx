import { IChat } from './IChat';
import { IUser } from './IUser';

export interface IMessage {
  id: string,
  message: string,
  user: IUser,
  chat: IChat,
  createdAt: Date,
  viewedBy: IUser[],
}
