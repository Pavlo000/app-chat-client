import { httpClient } from '../http/httpClient';
import { IChat } from '../types/IChat';

function getAll(userId: string) {
  return httpClient.get<unknown, IChat[]>(`/chats?userId=${userId}`);
}

function createOrGet(usersIds: string[]) {
  return httpClient.post<unknown, IChat>('/chats', { usersIds });
}

function getById(chatId: string) {
  return httpClient.get<unknown, IChat>(`/chats/${chatId}`);
}

export const chatService = {
  getAll,
  createOrGet,
  getById,
};
