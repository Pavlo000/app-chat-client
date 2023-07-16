import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
  id: string,
  users: [IUser, IUser],
  lastMessage: IMessage | null,
  createdAt: Date,
}