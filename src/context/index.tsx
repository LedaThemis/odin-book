import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

import handleError from '../lib/handleError';
import { AuthProvider } from './AuthProvider';
import { SocketProvider } from './SocketProvider';
import { UserProvider } from './UserProvider';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (e) => {
            handleError(e).errors.forEach((e) => {
                toast.error(e.msg);
            });
        },
    }),
    mutationCache: new MutationCache({
        onError: (e) => {
            handleError(e).errors.forEach((e) => {
                toast.error(e.msg);
            });
        },
    }),
});

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <SocketProvider>{children}</SocketProvider>
                </UserProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default AppProviders;
