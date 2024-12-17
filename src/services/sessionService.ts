import { httpClient } from '../http/httpClient';
import { ISession } from '../types/ISession';

function create(userId: string, socketId: string) {
  return httpClient.post<unknown, { session: ISession }>('/sessions', { userId, socketId });
}

export const sessionService = {
  create,
};

