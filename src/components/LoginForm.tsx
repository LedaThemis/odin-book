import styled from 'styled-components';

import GoogleSignInButton from './GoogleSignInButton';

const LoginForm = () => {
    return (
        <StyledFormContainer>
            <GoogleSignInButton />
        </StyledFormContainer>
    );
};

const StyledFormContainer = styled.div`
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 40px 0 0;
    padding: 20px 0 28px;
    width: 396px;
    height: fit-content;
`;

export default LoginForm;
