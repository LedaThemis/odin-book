import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';
import isPostLiked from '../lib/isPostLiked';
import likePost from '../lib/likePost';
import unlikePost from '../lib/unlikePost';
import CommentCreatePrompt from './CommentCreatePrompt';
import PostComments from './PostComments';
import PostHeader from './PostHeader';
import PostLikesPopup from './PostLikesPopup';
import PostPhotos from './PostPhotos';
import CommentButton from './buttons/CommentButton';
import LikeButton from './buttons/LikeButton';

interface PostProps {
    post: IPost;
}

const Post = ({ post }: PostProps) => {
    const user = useCurrentUser() as IUser;

    const [isLikesPopupShown, setIsLikesPopupShown] = useState(false);

    const queryClient = useQueryClient();
    const likeMutation = useMutation(() => likePost({ postId: post._id }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['timeline']);
        },
    });
    const unlikeMutation = useMutation(() => unlikePost({ postId: post._id }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['timeline']);
        },
    });

    const [clickedCommentButton, setClickedCommentButton] = useState(false);

    const handleLikeButton = () => {
        if (isPostLiked(post, user)) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
        }
    };

    return (
        <StyledPostContainer>
            <PostHeader post={post} />
            <StyledPostContent>{post.content}</StyledPostContent>
            {post.photos.length > 0 && <PostPhotos photos={post.photos} />}
            {post.likes.length > 0 && (
                <StyledPostStatsContainer>
                    <StyledLikesCountContainer
                        onClick={() => {
                            setIsLikesPopupShown(true);
                        }}
                    >
                        <StyledLikeIconContainer>
                            <FaThumbsUp size="12px" />
                        </StyledLikeIconContainer>
                        <StyledLikesCount>{post.likes.length}</StyledLikesCount>
                    </StyledLikesCountContainer>
                    {isLikesPopupShown && (
                        <PostLikesPopup
                            postId={post._id}
                            hidePopup={() => {
                                setIsLikesPopupShown(false);
                            }}
                        />
                    )}
                </StyledPostStatsContainer>
            )}
            <StyledActionButtonsWrapper>
                <StyledLineContainer />
                <StyledActionButtonsContainer>
                    <LikeButton
                        isLiked={isPostLiked(post, user)}
                        onClick={handleLikeButton}
                    />
                    <CommentButton
                        onClick={() => {
                            setClickedCommentButton(true);
                        }}
                    />
                </StyledActionButtonsContainer>
                {clickedCommentButton && <StyledLineContainer />}
                {clickedCommentButton && (
                    <StyledCommentCreatePrompt post={post} />
                )}
            </StyledActionButtonsWrapper>
            {clickedCommentButton && post.comments.length > 0 && (
                <PostComments comments={post.comments} post={post} />
            )}
        </StyledPostContainer>
    );
};

const StyledParagraphBase = styled.p`
    margin: 0;
`;

const StyledLineContainer = styled.div`
    margin: 0 10px;
    border-top: 1px solid #eee;
`;

const StyledPostContent = styled(StyledParagraphBase)`
    white-space: pre-line;
    padding: 0 12px;
`;

const StyledPostStatsContainer = styled.div`
    display: flex;
    padding: 0 12px;
`;

const StyledLikesCountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledLikeIconContainer = styled.div`
    display: flex;

    padding: 4px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: var(--secondary-background-color);
`;

const StyledLikesCount = styled.p`
    margin: 0;
    color: var(--secondary-text-color);
`;

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding-bottom: 8px;

    background-color: var(--secondary-background-color);

    border-radius: var(--standard-border-radius);
    box-shadow: 0 1px 2px var(--shadow-2);
`;
const StyledActionButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const StyledActionButtonsContainer = styled.div`
    display: flex;
    padding: 0 12px;
`;

const StyledCommentCreatePrompt = styled(CommentCreatePrompt)`
    padding: 0 12px;
`;

export default Post;
