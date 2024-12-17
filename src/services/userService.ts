import { httpClient } from '../http/httpClient';
import { IUser } from '../types/IUser';

function getAll() {
  return httpClient.get<unknown, IUser[]>('/users');
}

function getById(id: string) {
  return httpClient.get<unknown, IUser>(`/users/${id}`);
}

function update(id: string, user: Partial<IUser>) {
  return httpClient.put<unknown, IUser>(`/users/${id}`, user);
}

export const userService = {
  getAll,
  getById,
  update,
};
