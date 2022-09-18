import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

import { useCurrentUser } from './UserProvider';

const socket = io(process.env.REACT_APP_SERVER_ENDPOINT, {
    autoConnect: false,
    withCredentials: true,
});

const SocketContext = createContext(socket);

interface ISocketProvider {
    children: React.ReactNode;
}

const SocketProvider = ({ children }: ISocketProvider) => {
    const user = useCurrentUser();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (user && !socket.connected) {
            socket.connect();
        }
    }, [user]);

    useEffect(() => {
        socket.on('invalidate', (filters: InvalidateQueryFilters) => {
            queryClient.invalidateQueries(filters);
        });

        return () => {
            socket.off('invalidate');
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
