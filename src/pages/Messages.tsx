import { Outlet } from 'react-router-dom';
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
                <StyledOutlet>
                    <Outlet />
                </StyledOutlet>
            </StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: var(--secondary-background-color);
`;

const StyledLeftContainer = styled.div`
    max-height: calc(100vh - 56px); // Navbar height
    overflow-y: scroll;
    background-color: var(--secondary-background-color);
    padding: 0 16px;
    box-sizing: border-box;
    width: 360px;

    flex-shrink: 0;

    @media screen and (max-width: 900px) {
        width: fit-content;
        text-align: center;
    }

    border-right: 1px solid var(--section-separator-background-color);
`;

const StyledSectionTitle = styled.h1`
    color: var(--primary-text-color);
    font-size: 24px;
    margin: 20px 0;
`;

const StyledOutlet = styled.div`
    max-height: calc(100vh - 56px); // Navbar height
    flex-grow: 1;

    // Style <Outlet />
    & > div {
        height: 100%;
    }
`;

export default MessagesPage;
