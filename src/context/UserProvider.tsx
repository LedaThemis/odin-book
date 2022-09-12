import { createContext, useContext } from 'react';

import { IUser } from '../lib/interfaces/User';
import { useAuth } from './AuthProvider';

const UserContext = createContext<IUser | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={useAuth().data.user}>
        {children}
    </UserContext.Provider>
);
const useUser = () => useContext(UserContext);
const useSetUser = () => useAuth().setData;

export { UserProvider, useUser, useSetUser };
