import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

import getCurrentUser from '../lib/getCurrentUser';
import { IUser } from '../lib/interfaces/User';
import logoutUser from '../lib/logout';

type DataType = {
    user?: IUser;
};

interface IAuthContext {
    data: DataType;
    login?: () => boolean;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    data: {},
    setData: () => {
        return;
    },
});

function AuthProvider({ children }: { children: React.ReactNode }) {
    // TODO: DELETE (HERE FOR COMPATIBILITY)
    const [data, setData] = useState<DataType>({});

    const currentUserQuery = useQuery(['me'], getCurrentUser);

    const login = () => {
        return true;
    };

    const logout = async () => {
        await logoutUser();
        setData({});
    };

    if (currentUserQuery.isLoading) {
        return (
            <StyledLoaderContainer>
                <MoonLoader />
            </StyledLoaderContainer>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                data: {
                    user: currentUserQuery.data,
                },
                setData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

const StyledLoaderContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
`;

export { AuthProvider, useAuth };
