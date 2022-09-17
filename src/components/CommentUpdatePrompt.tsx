import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { IComment } from '../lib/interfaces/Comment';
import { IPost } from '../lib/interfaces/Post';
import updateComment from '../lib/updateComment';

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
    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => updateComment({ commentId: comment._id, content }),
        {
            onSuccess: (comment) => {
                const postCopy = Object.assign({}, post);
                postCopy.comments = postCopy.comments.map((c) =>
                    c._id === comment._id ? comment : c,
                );

                queryClient.setQueryData<IPost[]>(['timeline'], (old = []) =>
                    old.map((p) => (p._id === postCopy._id ? postCopy : p)),
                );

                cancelEditing();
            },
        },
    );

    const [content, setContent] = useState(comment.content);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (content.length < 1) return;

        mutation.mutate();
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
