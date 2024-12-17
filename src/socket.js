import { io } from 'socket.io-client';

const socket = io(process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_PRODUCTION_SERVER_URL 
  : process.env.REACT_APP_DEVELOPMENT_SERVER_URL, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
