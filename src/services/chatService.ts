import { httpClient } from '../http/httpClient';
import { IChat } from '../types/IChat';
import { IQueryOptions } from '../types/IQueryOptions';
import { IHttpListResponse, IHttpSingleResponse } from '../types/IHttpResponse';

function getAllQuery(userId: string, query: IQueryOptions) {
  return httpClient.get<unknown, IHttpListResponse<IChat>>('/chats', {
    params: {
      userId: userId || '',
      ...query,
    },
  });
}

function createOrGet(usersIds: string[]) {
  return httpClient.post<unknown, IHttpSingleResponse<IChat>>('/chats', { usersIds });
}

function getById(chatId: string) {
  return httpClient.get<unknown, IHttpSingleResponse<IChat>>(`/chats/${chatId}`);
}

export const chatService = {
  getAllQuery,
  createOrGet,
  getById,
};

