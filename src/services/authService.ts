import { authClient } from '../http/authClient';
import { IUser } from '../types/IUser';

type Credentials = { email: string; password: string };
type UserDetails = { firstName: string; lastName: string; avatar?: string };

function register(credentials: Credentials) {
  return authClient.post<unknown, { message: string }>('/registration', credentials);
}

function registerWithGoogle() {
  //TODO: finish google oauth
  return authClient.post('/registration/google');
}

async function login(credentials: Credentials) {
  return await authClient.post<unknown, { accessToken: string; user: IUser }>(
    '/login',
    credentials
  );
}

function loginWithGoogle() {
  //TODO: finish google oauth
  return authClient.post('/login/google');
}

function logout() {
  return authClient.post<unknown, void>('/logout');
}

function activate(activationToken: string, userDetails: UserDetails) {
  return authClient.post<unknown, { accessToken: string; user: IUser }>(
    `/activation/${activationToken}`,
    userDetails
  );
}

function refresh() {
  return authClient.get<unknown, { accessToken: string; user: IUser }>('/refresh');
}


export const authService = {
  register,
  registerWithGoogle,
  login,
  loginWithGoogle,
  logout,
  activate,
  refresh,
};
