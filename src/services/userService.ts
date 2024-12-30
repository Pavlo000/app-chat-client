import { httpClient } from '../http/httpClient';
import { IUser } from '../types/IUser';
import { IQueryOptions } from '../types/IQueryOptions';
import { IHttpListResponse, IHttpSingleResponse } from '../types/IHttpResponse';

function getAllQuery(query: IQueryOptions) {
  return httpClient.get<unknown, IHttpListResponse<IUser>>('/users', { params: query });
}

function getById(id: string) {
  return httpClient.get<unknown, IHttpSingleResponse<IUser>>(`/users/${id}`);
}

function update(id: string, user: Partial<IUser>) {
  return httpClient.put<unknown, IHttpSingleResponse<IUser>>(`/users/${id}`, user);
}

export const userService = {
  getAllQuery,
  getById,
  update,
};

