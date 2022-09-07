import { AuthProvider } from './AuthProvider';
import { UserProvider } from './UserProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    );
};

export default AppProviders;
