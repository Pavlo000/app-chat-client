import { httpClient } from '../http/httpClient';
import { INotification } from '../types/INotification';

function getAllByUserId(userId: string) {
  return httpClient.get<unknown, INotification[]>(`/notifications?userId=${userId}`);
}

function getByChatIdAndUserId(chatId: string, userId: string) {
  return httpClient.get<unknown, INotification[]>(`/notifications/chat/user?chatId=${chatId}&userId=${userId}`);
}
export const notificationService = {
  getAllByUserId,
  getByChatIdAndUserId,
};

