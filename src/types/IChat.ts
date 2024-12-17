import { IMessage } from './IMessage';
import { IUser } from './IUser';

export interface IChat {
  id: string;
  users: IUser[];
  lastMessage: IMessage | null;
  createdAt: Date;
}
