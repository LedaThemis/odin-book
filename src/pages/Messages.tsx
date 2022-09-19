import styled from 'styled-components';

import Chats from '../components/Chats';
import Navbar from '../components/Navbar';

const MessagesPage = () => {
    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <StyledLeftContainer>
                    <StyledSectionTitle>Chats</StyledSectionTitle>
                    <Chats />
                </StyledLeftContainer>
            </StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: white;
`;

const StyledLeftContainer = styled.div`
    min-height: 100%;
    background-color: white;
    padding: 0 16px;
    box-sizing: border-box;
    width: 360px;

    border-right: 1px solid var(--section-separator-background-color);
`;

const StyledSectionTitle = styled.h1`
    color: var(--primary-text-color);
    font-size: 24px;
    margin: 20px 0;
`;

export default MessagesPage;
