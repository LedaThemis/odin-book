import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_ENDPOINT);

const SocketContext = createContext(socket);

const useSocket = () => useContext(SocketContext);

export { SocketContext, useSocket };
