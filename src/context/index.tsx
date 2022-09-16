import { AuthProvider } from './AuthProvider';
import { SocketProvider } from './SocketProvider';
import { UserProvider } from './UserProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <SocketProvider>{children}</SocketProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default AppProviders;
