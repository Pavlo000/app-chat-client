import { IUser } from './IUser';

export interface ISession {
  id: string;
  user: IUser;
  createdAt: Date;
}
