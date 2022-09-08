import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <StyledHomeContainer>
                <StyledLeftHomeContainer></StyledLeftHomeContainer>
                <StyledMiddleHomeContainer>
                    <PostCreatePrompt />
                </StyledMiddleHomeContainer>
                <StyledRightHomeContainer></StyledRightHomeContainer>
            </StyledHomeContainer>
        </div>
    );
};
const StyledHomeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(380px, 1fr) 1fr;
    background-color: var(--background-color);
    min-height: 100vh;
    height: 100%;
`;

const StyledLeftHomeContainer = styled.div``;

const StyledMiddleHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    gap: 10px;
`;

const StyledRightHomeContainer = styled.div``;

export default HomePage;
