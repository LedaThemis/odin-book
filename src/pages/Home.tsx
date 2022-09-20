import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';
import Posts from '../components/Posts';
import useTimeline from '../hooks/useTimeline';

const HomePage = () => {
    const {
        isSuccess,
        isLoading,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useTimeline();

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

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
                        {isSuccess && (
                            <>
                                {data.pages.map((group, i) => (
                                    <Posts key={i} posts={group.posts} />
                                ))}
                            </>
                        )}
                    </FetchingOverlay>
                    <StyledButton
                        onClick={() => fetchNextPage()}
                        ref={ref}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                            ? 'Load more'
                            : 'Nothing more to load'}
                    </StyledButton>
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

const StyledButton = styled.button`
    cursor: pointer;
`;

export default HomePage;
