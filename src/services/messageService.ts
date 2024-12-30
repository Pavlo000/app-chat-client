import { httpClient } from '../http/httpClient';
import { IMessage } from '../types/IMessage';
import { IHttpListResponse, IHttpSingleResponse } from '../types/IHttpResponse';
import { IQueryOptions } from '../types/IQueryOptions';

function getAllByChatIdQuery(chatId: string, query: IQueryOptions) {
  return httpClient.get<unknown, IHttpListResponse<IMessage>>('/messages', {
    params: {
      chatId,
      ...query,
    },
  });
}

function getById(messageId: string) {
  return httpClient.get<unknown, IHttpSingleResponse<IMessage>>(`/messages/${messageId}`);
}

export const messageService = {
  getAllByChatIdQuery,
  getById,
};
