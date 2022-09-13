import styled from 'styled-components';

import Navbar from '../components/Navbar';
import UserUpdateSection from '../components/UserUpdateSection';

const SettingsPage = () => {
    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <StyledSectionsContainer>
                    <UserUpdateSection />
                </StyledSectionsContainer>
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

const StyledSectionsContainer = styled.div``;

export default SettingsPage;
