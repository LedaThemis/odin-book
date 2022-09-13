import { useState } from 'react';
import styled from 'styled-components';

import { useManagePost } from '../context/ManagePostProvider';
import { IComment } from '../lib/interfaces/Comment';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import updateComment from '../lib/updateComment';
import Errors from './Errors';

interface ICommentUpdatePrompt {
    post: IPost;
    comment: IComment;
    cancelEditing: () => void;
}

const CommentUpdatePrompt = ({
    post,
    comment,
    cancelEditing,
}: ICommentUpdatePrompt) => {
    const { updatePostInState } = useManagePost();

    const [content, setContent] = useState(comment.content);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (content.length < 1) return;

        const res = await updateComment({ commentId: comment._id, content });

        switch (res.state) {
            case 'success':
                setContent('');
                post.comments = post.comments.map((c) =>
                    c._id === comment._id ? res.comment : c,
                );
                updatePostInState(post);
                setErrors([]);
                cancelEditing();
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    return (
        <StyledContainer>
            <StyledWrapper>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        value={content}
                        placeholder="Write a comment..."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </StyledForm>
                <StyledP onClick={cancelEditing}>Cancel</StyledP>
                <Errors errors={errors} />
            </StyledWrapper>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    gap: 6px;

    width: 100%;
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
`;

const StyledForm = styled.form``;

const StyledInput = styled.input`
    border: none;

    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 15px;

    background-color: var(--background-color);
    border-radius: 9999px;

    box-sizing: border-box;
    padding: 8px 12px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

const StyledP = styled.p`
    margin: 0;
    color: var(--primary-color);
    font-size: 12px;

    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export default CommentUpdatePrompt;
