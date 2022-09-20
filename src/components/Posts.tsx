import styled from 'styled-components';

import { IPost } from '../lib/interfaces/Post';
import Post from './Post';

interface IPostsRender {
    posts: IPost[];
}

const PostsRender = ({ posts }: IPostsRender) => {
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

export default PostsRender;
