import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';
import PostsRender from '../components/PostsRender';
import getTimeline from '../lib/getTimeline';

const HomePage = () => {
    const {
        isSuccess,
        isLoading,
        data = [],
    } = useQuery(['timeline'], getTimeline, {
        refetchOnWindowFocus: false,
    });

    return (
        <StyledWrapper>
            <Navbar />
            <StyledHomeContainer>
                <StyledLeftHomeContainer></StyledLeftHomeContainer>
                <StyledMiddleHomeContainer>
                    <PostCreatePrompt />
                    <FetchingOverlay
                        isFetching={isLoading}
                        text="Loading Timeline..."
                    >
                        {isSuccess && <PostsRender posts={data} />}
                    </FetchingOverlay>
                </StyledMiddleHomeContainer>
                <StyledRightHomeContainer></StyledRightHomeContainer>
            </StyledHomeContainer>
        </StyledWrapper>
    );
};
const StyledWrapper = styled.div`
    background-color: var(--background-color);
    min-height: 100vh;
`;

const StyledHomeContainer = styled.div`
    display: grid;
    justify-content: center;
`;

const StyledLeftHomeContainer = styled.div``;

const StyledMiddleHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 16px;
    box-sizing: border-box;
    gap: 10px;

    max-width: 680px;
`;

const StyledRightHomeContainer = styled.div``;

export default HomePage;
