import styled from 'styled-components';

import Navbar from '../components/Navbar';
import UserUpdateSection from '../components/UserUpdateSection';

const SettingsPage = () => {
    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <UserUpdateSection />
            </StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;

    box-sizing: border-box;
    padding: 16px 0;
`;

export default SettingsPage;
