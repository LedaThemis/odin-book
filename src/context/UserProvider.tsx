import { createContext, useContext } from 'react';

import { IUser } from '../lib/interfaces/User';
import { useAuth } from './AuthProvider';

const UserContext = createContext<IUser | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={useAuth().data.user}>
        {children}
    </UserContext.Provider>
);
const useCurrentUser = () => useContext(UserContext);

export { UserProvider, useCurrentUser };
