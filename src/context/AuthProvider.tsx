import { createContext, useContext, useEffect, useState } from 'react';
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
    logout?: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({ data: {} });

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<DataType>({});
    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const response = await getCurrentUser();

            setData(response);
            setIsFetching(false);
        })();
    }, []);

    const login = () => {
        return true;
    };

    const logout = async () => {
        await logoutUser();
        setData({});
    };

    if (isFetching) {
        return (
            <StyledLoaderContainer>
                <MoonLoader />
            </StyledLoaderContainer>
        );
    }

    return (
        <AuthContext.Provider value={{ data, login, logout }}>
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
