import { httpClient } from '../http/httpClient';

function getAll(userId: string) {
  return httpClient.get(`/chats?userId=${userId}`);
}

function create(usersIds: string[]) {
  return httpClient.post('/chats', { usersIds });
}

function getById(chatId: string) {
  return httpClient.get(`/chats/${chatId}`);
}

export const chatService = { 
  getAll,
  create,
  getById,
};