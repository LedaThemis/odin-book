import styled from 'styled-components';

import { IPost } from '../lib/interfaces/Post';
import Post from './Post';

interface PostsProps {
    posts: IPost[];
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <StyledPostsContainer>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </StyledPostsContainer>
    );
};

const StyledPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
`;

export default Posts;
