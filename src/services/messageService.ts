import { httpClient } from '../http/httpClient';


function getAll(chatId: string) {
  return httpClient.get(`/messages?chatId=${chatId}`);
}


export const messageService = { 
  getAll,
};