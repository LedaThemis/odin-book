import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

import getCurrentUser from '../lib/getCurrentUser';
import { IUser } from '../lib/interfaces/User';
import logoutUser from '../lib/logout';

type DataType = {
    user: IUser | null;
};

interface IAuthContext {
    data: DataType;
    login?: () => boolean;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    data: {
        user: null,
    },
});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    const currentUserQuery = useQuery(['me'], getCurrentUser);

    const login = () => {
        return true;
    };

    const logout = async () => {
        await logoutUser();
        queryClient.invalidateQueries(['me']);
    };

    if (currentUserQuery.isLoading) {
        return (
            <StyledLoaderContainer>
                <MoonLoader />
            </StyledLoaderContainer>
        );
    } else if (currentUserQuery.isError) {
        return (
            <StyledLoaderContainer>
                <h1>Fetching current user from server resulted in an error.</h1>
            </StyledLoaderContainer>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                data: {
                    user: currentUserQuery.data,
                },
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
