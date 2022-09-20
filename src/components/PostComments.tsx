import styled from 'styled-components';

import { IComment } from '../lib/interfaces/Comment';
import { IPost } from '../lib/interfaces/Post';
import PostComment from './PostComment';

interface IPostComments {
    comments: IComment[];
    post: IPost;
}

const PostComments = ({ post, comments }: IPostComments) => {
    return (
        <StyledCommentsContainer>
            {comments.map((comment) => (
                <PostComment key={comment._id} post={post} comment={comment} />
            ))}
        </StyledCommentsContainer>
    );
};

const StyledCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding: 0 12px;
`;

export default PostComments;
