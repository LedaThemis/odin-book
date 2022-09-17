import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';
import PostsRender from '../components/PostsRender';
import useTimeline from '../hooks/useTimeline';
import getTimeline from '../lib/getTimeline';
import { IPost } from '../lib/interfaces/Post';

const HomePage = () => {
    const {
        isSuccess,
        isLoading,
        data = [],
    } = useQuery(['timeline'], getTimeline, {
        refetchOnWindowFocus: false,
    });

    const [posts, setPosts] = useState<IPost[]>([]);

    const { posts: timelinePosts } = useTimeline();

    const addPostToState = (post: IPost) => {
        setPosts((prevPosts) => [post].concat(prevPosts));
    };

    const postsList = useMemo(() => {
        const lst = data.concat(timelinePosts);
        return lst.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );
    }, [data, timelinePosts]);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledHomeContainer>
                <StyledLeftHomeContainer></StyledLeftHomeContainer>
                <StyledMiddleHomeContainer>
                    <PostCreatePrompt addPostToState={addPostToState} />
                    <FetchingOverlay
                        isFetching={isLoading}
                        text="Loading Timeline..."
                    >
                        {isSuccess && (
                            <PostsRender
                                posts={postsList}
                                setPosts={setPosts}
                            />
                        )}
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
