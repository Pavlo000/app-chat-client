import { authClient } from '../http/authClient';

type Credentials = { email: string; password: string };
type UserDetails = { name: string, surname: string, avatar?: string };

function register(credentials: Credentials) {
  return authClient.post('/registration', credentials);
}

function registerWithGoogle() {
  return authClient.post('/registration/google');
}

async function login(credentials: Credentials) {
  return await authClient.post('/login', credentials);
}

function loginWithGoogle() {
  return authClient.post('/login/google');
}

function logout() {
  return authClient.post('/logout');
}

function activate(activationToken: string, userDetails: UserDetails) {
  return authClient.post(`/activation/${activationToken}`, userDetails);
}

function refresh() {
  return authClient.get('/refresh');
}

export const authService = { 
  register, 
  registerWithGoogle, 
  login,
  loginWithGoogle,
  logout, 
  activate, 
  refresh 
};
