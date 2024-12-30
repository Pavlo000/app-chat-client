import { httpClient } from '../http/httpClient';
import { IHttpListResponse } from '../types/IHttpResponse';
import { INotification } from '../types/INotification';

function getAllByUserId(userId: string) {
  return httpClient.get<unknown, IHttpListResponse<INotification>>('/notifications', {
    params: {
      userId,
    },
  });
}

function getByChatIdAndUserId(chatId: string, userId: string) {
  return httpClient.get<unknown, IHttpListResponse<INotification>>('/notifications/chat/user', {
    params: {
      chatId,
      userId,
    },
  });
}
export const notificationService = {
  getAllByUserId,
  getByChatIdAndUserId,
};

