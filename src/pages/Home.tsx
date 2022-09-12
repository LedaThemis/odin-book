import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

import Errors from '../components/Errors';
import Navbar from '../components/Navbar';
import PostCreatePrompt from '../components/PostCreatePrompt';
import PostsRender from '../components/PostsRender';
import getTimeline from '../lib/getTimeline';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';

const HomePage = () => {
    const [isFetchingPosts, setIsFetchingPosts] = useState(true);
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
                    {isFetchingPosts && (
                        <StyledLoadingContainer>
                            <MoonLoader />
                            <p>Loading Timeline...</p>
                        </StyledLoadingContainer>
                    )}
                    <PostsRender posts={posts} setPosts={setPosts} />
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

const StyledLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export default HomePage;
