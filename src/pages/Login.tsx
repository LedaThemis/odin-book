import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import { useUser } from '../context/UserProvider';

const LoginPage = () => {
    const user = useUser();

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <StyledContainer>
            <TextContentContainer>
                <StyledFacebookHeader>facebook</StyledFacebookHeader>
                <StyledH2>
                    Connect with friends and the world around you on Facebook.
                </StyledH2>
            </TextContentContainer>
            <LoginForm />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: var(--background-color);
    height: 100vh;
    padding: 0 40px;
    padding-top: 152px;
    box-sizing: border-box;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        gap: 28px;
    }
`;

const TextContentContainer = styled.div`
    margin-right: 50px;
    
    @media screen and (max-width: 1100px) {
        margin-right: 0;
        text-align: center;
    }
`;

const StyledFacebookHeader = styled.h1`
    color: var(--primary-color);
    font-family: Roboto, 'sans-serif';
    font-weight: 700;
    font-size: 48px;
    line-height: 20px;
`;

const StyledH2 = styled.h2`
    font-family: Roboto, 'sans-serif';
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    width: auto;
`;

export default LoginPage;
