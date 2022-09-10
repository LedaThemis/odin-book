import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '../context/UserProvider';
import areSameUser from '../lib/areSameUser';
import getFormattedTime from '../lib/getFormattedTime';
import getUserURL from '../lib/getUserURL';
import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';
import CommentCreatePrompt from './CommentCreatePrompt';
import PostActionMenu from './PostActionMenu';
import PostUpdatePopup from './PostUpdatePopup';
import CommentButton from './buttons/CommentButton';
import LikeButton from './buttons/LikeButton';
import UserIcon from './icons/UserIcon';

type IPostHeader = IPostRender;

const PostHeader = ({ post }: IPostHeader) => {
    const user = useUser() as IUser;
    const [isActionMenuShown, setIsActionMenuShown] = useState(false);
    const [isPostUpdatePopupShown, setIsPostUpdatePopupShown] = useState(false);

    return (
        <StyledPostHeaderWrapper>
            <StyledPostHeaderContainer>
                <StyledLinkBase to={getUserURL(post.author)}>
                    <UserIcon user={post.author} />
                </StyledLinkBase>
                <StyledAuthorNameCreatedDateContainer>
                    <StyledPostAuthorLink to={getUserURL(post.author)}>
                        <StyledPostAuthorName>
                            {post.author.displayName}
                        </StyledPostAuthorName>
                    </StyledPostAuthorLink>
                    <StyledPostCreatedDate>
                        {getFormattedTime(post.createdAt)}
                    </StyledPostCreatedDate>
                </StyledAuthorNameCreatedDateContainer>
            </StyledPostHeaderContainer>
            <StyledThreeDotsButton
                onClick={() => setIsActionMenuShown((prevState) => !prevState)}
            >
                <BsThreeDots size={'20px'} />
            </StyledThreeDotsButton>
            {areSameUser(user, post.author) && isActionMenuShown && (
                <PostActionMenu
                    handleEditPost={() => {
                        // Hide action menu
                        setIsActionMenuShown(false);
                        // Display PostUpdatePopup
                        setIsPostUpdatePopupShown(true);
                    }}
                />
            )}
            {isPostUpdatePopupShown && (
                <PostUpdatePopup
                    originalPost={post}
                    setIsPopupShown={setIsPostUpdatePopupShown}
                />
            )}
        </StyledPostHeaderWrapper>
    );
};

interface IPostRender {
    post: IPost;
}

const PostRender = ({ post }: IPostRender) => {
    return (
        <StyledPostContainer>
            <PostHeader post={post} />
            <StyledPostContent>{post.content}</StyledPostContent>
            <StyledActionButtonsWrapper>
                <StyledLineContainer />
                <StyledActionButtonsContainer>
                    <LikeButton />
                    <CommentButton />
                </StyledActionButtonsContainer>
                <StyledLineContainer />
                <StyledCommentCreatePrompt />
            </StyledActionButtonsWrapper>
        </StyledPostContainer>
    );
};

interface IPostsRender {
    posts: IPost[];
}

const PostsRender = ({ posts }: IPostsRender) => {
    return (
        <StyledPostsContainer>
            {posts.map((post, id) => (
                <PostRender key={`post-${id}-${post.content}`} post={post} />
            ))}
        </StyledPostsContainer>
    );
};

const StyledLineContainer = styled.div`
    margin: 0 10px;
    border-top: 1px solid #eee;
`;

const StyledLinkBase = styled(Link)`
    display: flex;
`;

const StyledParagraphBase = styled.p`
    margin: 0;
`;

const StyledPostHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;

    padding: 12px 16px 0 16px;
`;

const StyledPostHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StyledAuthorNameCreatedDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

const StyledPostAuthorLink = styled(StyledLinkBase)`
    text-decoration: none;
`;

const StyledPostAuthorName = styled(StyledParagraphBase)`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-text-color);

    &:hover {
        text-decoration: underline;
    }
`;

const StyledPostCreatedDate = styled(StyledParagraphBase)`
    color: var(--secondary-text-color);
    font-size: 13px;
`;

const StyledThreeDotsButton = styled.button`
    border: none;
    padding: 0;
    background-color: transparent;

    height: 36px;
    width: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--secondary-text-color);
    border-radius: 50%;

    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

const StyledPostContent = styled(StyledParagraphBase)`
    white-space: pre-line;
    padding: 0 12px;
`;

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding-bottom: 8px;

    background-color: white;

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

const StyledPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledCommentCreatePrompt = styled(CommentCreatePrompt)`
    padding: 0 12px;
`;

export default PostsRender;
