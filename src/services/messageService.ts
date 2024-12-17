import { httpClient } from '../http/httpClient';
import { IMessage } from '../types/IMessage';

function getAllByChatId(chatId: string) {
  return httpClient.get<unknown, IMessage[]>(`/messages?chatId=${chatId}`);
}

function getById(messageId: string) {
  return httpClient.get<unknown, IMessage[]>(`/messages/${messageId}`);
}

export const messageService = {
  getAllByChatId,
  getById,
};
