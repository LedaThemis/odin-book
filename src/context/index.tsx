import { io } from 'socket.io-client';

import { AuthProvider } from './AuthProvider';
import { SocketContext } from './SocketProvider';
import { UserProvider } from './UserProvider';

const socket = io(process.env.REACT_APP_SERVER_ENDPOINT, {
    withCredentials: true,
});

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <SocketContext.Provider value={socket}>
                    {children}
                </SocketContext.Provider>
            </UserProvider>
        </AuthProvider>
    );
};

export default AppProviders;
