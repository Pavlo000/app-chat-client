import { httpClient } from '../http/httpClient';
import { IHttpSingleResponse } from '../types/IHttpResponse';

function create(userId: string, socketId: string) {
  return httpClient.post<unknown, IHttpSingleResponse<void>>('/sessions', { userId, socketId });
}

export const sessionService = {
  create,
};

