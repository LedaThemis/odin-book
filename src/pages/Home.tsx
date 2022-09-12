import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Errors from '../components/Errors';
import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';
import PostsRender from '../components/PostsRender';
import getTimeline from '../lib/getTimeline';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';

const HomePage = () => {
    const [isFetchingPosts, setIsFetchingPosts] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const addPostToState = (post: IPost) => {
        setPosts((prevPosts) => [post].concat(prevPosts));
    };

    useEffect(() => {
        (async () => {
            setIsFetchingPosts(true);
            const res = await getTimeline();
            setIsFetchingPosts(false);

            switch (res.state) {
                case 'success':
                    setErrors([]);
                    setPosts(res.posts);
                    break;
                case 'failed':
                    setErrors(res.errors);
                    break;
            }
        })();
    }, []);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledHomeContainer>
                <StyledLeftHomeContainer></StyledLeftHomeContainer>
                <StyledMiddleHomeContainer>
                    <PostCreatePrompt addPostToState={addPostToState} />
                    {errors && <Errors errors={errors} />}
                    <FetchingOverlay
                        isFetching={isFetchingPosts}
                        text="Loading Timeline..."
                    >
                        <PostsRender posts={posts} setPosts={setPosts} />
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
    grid-template-columns: 1fr minmax(380px, 1fr) 1fr;
`;

const StyledLeftHomeContainer = styled.div``;

const StyledMiddleHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    gap: 10px;
`;

const StyledRightHomeContainer = styled.div``;

export default HomePage;
