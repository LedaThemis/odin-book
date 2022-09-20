import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import areSameUser from '../lib/areSameUser';
import getFormattedTime from '../lib/getFormattedTime';
import getUserURL from '../lib/getUserURL';
import { IUser } from '../lib/interfaces/User';
import PostActionMenu from './PostActionMenu';
import PostDeletePopup from './PostDeletePopup';
import PostUpdatePopup from './PostUpdatePopup';
import UserIcon from './icons/UserIcon';
import { IPost } from '../lib/interfaces/Post';

type IPostHeader = {
    post: IPost;
};

const PostHeader = ({ post }: IPostHeader) => {
    const user = useCurrentUser() as IUser;
    const [isActionMenuShown, setIsActionMenuShown] = useState(false);
    const [isPostUpdatePopupShown, setIsPostUpdatePopupShown] = useState(false);
    const [isPostDeletePopupShown, setIsPostDeletePopupShown] = useState(false);

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
            {areSameUser(user, post.author) && (
                <StyledThreeDotsButton
                    onClick={() =>
                        setIsActionMenuShown((prevState) => !prevState)
                    }
                >
                    <BsThreeDots size={'20px'} />
                </StyledThreeDotsButton>
            )}
            {isActionMenuShown && (
                <PostActionMenu
                    handleEditPost={() => {
                        setIsActionMenuShown(false);
                        setIsPostUpdatePopupShown(true);
                    }}
                    handleDeletePost={() => {
                        setIsActionMenuShown(false);
                        setIsPostDeletePopupShown(true);
                    }}
                />
            )}
            {isPostUpdatePopupShown && (
                <PostUpdatePopup
                    originalPost={post}
                    setIsPopupShown={setIsPostUpdatePopupShown}
                />
            )}
            {isPostDeletePopupShown && (
                <PostDeletePopup
                    post={post}
                    hidePopup={() => setIsPostDeletePopupShown(false)}
                />
            )}
        </StyledPostHeaderWrapper>
    );
};

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

export default PostHeader;
