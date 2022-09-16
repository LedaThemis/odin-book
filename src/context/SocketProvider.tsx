import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

import { useUser } from './UserProvider';

const socket = io(process.env.REACT_APP_SERVER_ENDPOINT, {
    autoConnect: false,
    withCredentials: true,
});

const SocketContext = createContext(socket);

interface ISocketProvider {
    children: React.ReactNode;
}

const SocketProvider = ({ children }: ISocketProvider) => {
    const user = useUser();

    useEffect(() => {
        if (user && !socket.connected) {
            socket.connect();
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
