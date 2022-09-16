import styled from 'styled-components';

import GoogleSignInButton from './GoogleSignInButton';
import GuestAccountSelect from './GuestAccountSelect';

const LoginForm = () => {
    return (
        <StyledFormContainer>
            <GoogleSignInButton />
            <StyledLineContainer />
            <StyledP>Or use one of the available guest accounts:</StyledP>
            <GuestAccountSelect />
        </StyledFormContainer>
    );
};

const StyledFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 40px 0 0;
    padding: 20px 0 28px;
    width: 396px;
    height: fit-content;
`;

const StyledLineContainer = styled.div`
    border-top: 1px solid #eee;
    width: 100%;
`;

const StyledP = styled.p`
    margin: 0;
`;

export default LoginForm;
