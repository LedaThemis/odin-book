import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
    ManagePostContext,
    useManagePost,
} from '../context/ManagePostProvider';
import { useUser } from '../context/UserProvider';
import areSameUser from '../lib/areSameUser';
import getFormattedTime from '../lib/getFormattedTime';
import getUserURL from '../lib/getUserURL';
import { IComment } from '../lib/interfaces/Comment';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';
import likePost from '../lib/likePost';
import unlikePost from '../lib/unlikePost';
import CommentCreatePrompt from './CommentCreatePrompt';
import Errors from './Errors';
import PostActionMenu from './PostActionMenu';
import PostDeletePopup from './PostDeletePopup';
import PostUpdatePopup from './PostUpdatePopup';
import CommentButton from './buttons/CommentButton';
import LikeButton from './buttons/LikeButton';
import UserIcon from './icons/UserIcon';

type IPostHeader = {
    post: IPost;
};

const PostHeader = ({ post }: IPostHeader) => {
    const user = useUser() as IUser;
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
            <StyledThreeDotsButton
                onClick={() => setIsActionMenuShown((prevState) => !prevState)}
            >
                <BsThreeDots size={'20px'} />
            </StyledThreeDotsButton>
            {areSameUser(user, post.author) && isActionMenuShown && (
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

interface IPostPhotos {
    photos: string[];
}

const PostPhotos = ({ photos }: IPostPhotos) => {
    return (
        <StyledImagesContainer>
            {photos.map((photo, id) => (
                <StyledImageContainer key={`post-photo-${id}-${photo}`}>
                    <StyledImage src={photo} referrerPolicy="no-referrer" />
                </StyledImageContainer>
            ))}
        </StyledImagesContainer>
    );
};

interface IPostComment {
    comment: IComment;
}

const PostComment = ({ comment }: IPostComment) => {
    return (
        <StyledPostCommentContainer>
            <StyledLinkBase to={getUserURL(comment.author)}>
                <UserIcon user={comment.author} size={'32px'} />
            </StyledLinkBase>
            <StyledFlexColumnWrapper>
                <StyledCommentWrapper>
                    <StyledCommentAuthorLink to={getUserURL(comment.author)}>
                        <StyledCommentAuthorName>
                            {comment.author.displayName}
                        </StyledCommentAuthorName>
                    </StyledCommentAuthorLink>
                    <StyledCommentContent>
                        {comment.content}
                    </StyledCommentContent>
                </StyledCommentWrapper>
                <StyledCommentDate>
                    {getFormattedTime(comment.createdAt)}
                </StyledCommentDate>
            </StyledFlexColumnWrapper>
        </StyledPostCommentContainer>
    );
};

interface IPostComments {
    comments: IComment[];
}

const PostComments = ({ comments }: IPostComments) => {
    return (
        <StyledCommentsContainer>
            {comments.map((comment) => (
                <PostComment
                    key={`post-comment-${comment.author.displayName}-${comment.content}`}
                    comment={comment}
                />
            ))}
        </StyledCommentsContainer>
    );
};

interface IPostRender {
    post: IPost;
}

const PostRender = ({ post }: IPostRender) => {
    const user = useUser() as IUser;
    const [clickedCommentButton, setClickedCommentButton] = useState(false);
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const { updatePostInState } = useManagePost();

    const handleLikeButton = async () => {
        const fn = post.likes.includes(user._id) ? unlikePost : likePost;

        const res = await fn({ postId: post._id });

        switch (res.state) {
            case 'success':
                setErrors([]);
                updatePostInState(res.post);
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    return (
        <StyledPostContainer>
            <PostHeader post={post} />
            <StyledPostContent>{post.content}</StyledPostContent>
            {post.photos.length > 0 && <PostPhotos photos={post.photos} />}
            <StyledActionButtonsWrapper>
                <StyledLineContainer />
                <StyledActionButtonsContainer>
                    <LikeButton onClick={handleLikeButton} />
                    <CommentButton
                        onClick={() => {
                            setClickedCommentButton(true);
                        }}
                    />
                </StyledActionButtonsContainer>
                {clickedCommentButton && <StyledLineContainer />}
                {errors.length > 0 && <Errors errors={errors} />}
                {clickedCommentButton && (
                    <StyledCommentCreatePrompt post={post} />
                )}
            </StyledActionButtonsWrapper>
            {clickedCommentButton && post.comments.length > 0 && (
                <PostComments comments={post.comments} />
            )}
        </StyledPostContainer>
    );
};

interface IPostsRender {
    posts: IPost[];
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostsRender = ({ posts, setPosts }: IPostsRender) => {
    const addPostToState = (post: IPost) => {
        setPosts((prevPosts) => [post].concat(prevPosts));
    };

    const updatePostInState = (id: number, post: IPost) => {
        setPosts((prevPosts) =>
            prevPosts
                .slice(0, id)
                .concat([post])
                .concat(prevPosts.slice(id + 1)),
        );
    };

    const deletePostFromState = (post: IPost) => {
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
    };

    return (
        <StyledPostsContainer>
            {posts.map((post, id) => (
                <ManagePostContext.Provider
                    key={`post-${id}-${post.content}`}
                    value={{
                        addPostToState,
                        updatePostInState: (post: IPost) => {
                            updatePostInState(id, post);
                        },
                        deletePostFromState: () => {
                            deletePostFromState(post);
                        },
                    }}
                >
                    <PostRender post={post} />
                </ManagePostContext.Provider>
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

const StyledImagesContainer = styled.div`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    max-height: 500px;
    overflow-y: scroll;
`;

const StyledImageContainer = styled.div`
    display: flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`;

const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const StyledCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding: 0 12px;
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

export default PostsRender;
