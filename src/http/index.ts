import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_PRODUCTION_SERVER_URL
      : process.env.REACT_APP_DEVELOPMENT_SERVER_URL,
    withCredentials: true,
  });
}
