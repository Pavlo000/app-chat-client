import { authClient } from '../http/authClient';
import {  IHttpSingleResponse } from '../types/IHttpResponse';
import { IUser } from '../types/IUser';

type Credentials = { email: string; password: string };
type UserDetails = { firstName: string; lastName: string; avatar?: string };

function register(credentials: Credentials) {
  return authClient.post<unknown, IHttpSingleResponse<{ message: string }>>(
    '/registration',
    credentials
  );
}

async function login(credentials: Credentials) {
  return await authClient.post<unknown, IHttpSingleResponse<{ accessToken: string; user: IUser }>>(
    '/login',
    credentials
  );
}

function logout() {
  return authClient.post<unknown, IHttpSingleResponse<never>>('/logout');
}

function activate(activationToken: string, userDetails: UserDetails) {
  return authClient.post<unknown, IHttpSingleResponse<{ accessToken: string; user: IUser }>>(
    `/activation/${activationToken}`,
    userDetails
  );
}

  function refresh() {
    return authClient.get<unknown, IHttpSingleResponse<{ accessToken: string; user: IUser }>>(
      '/refresh'
    );
}


export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
};
