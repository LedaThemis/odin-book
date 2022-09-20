import { useMemo, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import areSameUser from '../lib/areSameUser';
import getFormattedTime from '../lib/getFormattedTime';
import getUserURL from '../lib/getUserURL';
import { IComment } from '../lib/interfaces/Comment';
import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';
import CommentActionMenu from './CommentActionMenu';
import CommentDeletePopup from './CommentDeletePopup';
import CommentUpdatePrompt from './CommentUpdatePrompt';
import UserIcon from './icons/UserIcon';

interface IPostComment {
    post: IPost;
    comment: IComment;
}

const PostComment = ({ post, comment }: IPostComment) => {
    const user = useCurrentUser() as IUser;
    const [isActionMenuShown, setIsActionMenuShown] = useState(false);
    const [isUpdatingComment, setIsUpdatingComment] = useState(false);
    const [isCommentDeletePopupShown, setIsCommentDeletePopupShown] =
        useState(false);

    const CommentComponent = () =>
        useMemo(
            () =>
                isUpdatingComment ? (
                    <CommentUpdatePrompt
                        comment={comment}
                        cancelEditing={() => {
                            setIsUpdatingComment(false);
                        }}
                    />
                ) : (
                    <StyledFlexColumnWrapper>
                        <StyledFlexRowWrapper>
                            <StyledCommentWrapper>
                                <StyledCommentAuthorLink
                                    to={getUserURL(comment.author)}
                                >
                                    <StyledCommentAuthorName>
                                        {comment.author.displayName}
                                    </StyledCommentAuthorName>
                                </StyledCommentAuthorLink>
                                <StyledCommentContent>
                                    {comment.content}
                                </StyledCommentContent>
                            </StyledCommentWrapper>
                            {(areSameUser(comment.author, user) ||
                                areSameUser(post.author, user)) && (
                                <StyledCommentThreeDotsButton
                                    onClick={() => {
                                        setIsActionMenuShown(
                                            (prevState) => !prevState,
                                        );
                                    }}
                                >
                                    <BsThreeDots size={'16px'} />
                                    {isActionMenuShown && (
                                        <CommentActionMenu
                                            handleEditComment={() => {
                                                setIsUpdatingComment(true);
                                            }}
                                            handleDeleteComment={() => {
                                                setIsCommentDeletePopupShown(
                                                    true,
                                                );
                                            }}
                                            showEdit={areSameUser(
                                                comment.author,
                                                user,
                                            )}
                                        />
                                    )}
                                </StyledCommentThreeDotsButton>
                            )}
                        </StyledFlexRowWrapper>
                        <StyledCommentDate>
                            {getFormattedTime(comment.createdAt)}
                        </StyledCommentDate>
                    </StyledFlexColumnWrapper>
                ),
            [isUpdatingComment],
        );

    return (
        <StyledPostCommentContainer>
            <StyledLinkBase to={getUserURL(comment.author)}>
                <UserIcon user={comment.author} size={'32px'} />
            </StyledLinkBase>
            <CommentComponent />
            {isCommentDeletePopupShown && (
                <CommentDeletePopup
                    post={post}
                    comment={comment}
                    hidePopup={() => {
                        setIsCommentDeletePopupShown(false);
                    }}
                />
            )}
        </StyledPostCommentContainer>
    );
};

const StyledParagraphBase = styled.p`
    margin: 0;
`;

const StyledLinkBase = styled(Link)`
    display: flex;
`;

const StyledPostCommentContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const StyledCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--comment-background-color);
    padding: 8px 12px;

    border-radius: 18px;

    width: 100%;
`;

const StyledCommentAuthorLink = styled(StyledLinkBase)`
    text-decoration: none;
`;

const StyledCommentAuthorName = styled(StyledParagraphBase)`
    font-weight: bold;
    font-size: 13px;
    color: var(--primary-text-color);
`;

const StyledCommentContent = styled(StyledParagraphBase)`
    font-size: 15px;
`;

const StyledCommentDate = styled(StyledParagraphBase)`
    color: var(--secondary-text-color);
    font-size: 13px;
    padding: 0 12px;
    box-sizing: border-box;
`;

const StyledFlexColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const StyledFlexRowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
`;

const StyledCommentThreeDotsButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 8px;
    display: flex;

    position: relative;

    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

export default PostComment;
