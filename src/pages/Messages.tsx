import styled from 'styled-components';

import Navbar from '../components/Navbar';

const MessagesPage = () => {
    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>Messages</StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div``;

export default MessagesPage;
