import { io } from 'socket.io-client';

// Use same-origin; nginx in client image proxies /socket.io to server
const socket = io('/', {
  path: '/socket.io',
  withCredentials: true,
});

export default socket;
