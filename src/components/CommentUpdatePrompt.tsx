import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { IComment } from '../lib/interfaces/Comment';
import updateComment from '../lib/updateComment';

interface CommentUpdatePromptProps {
    comment: IComment;
    cancelEditing: () => void;
}

const CommentUpdatePrompt = ({
    comment,
    cancelEditing,
}: CommentUpdatePromptProps) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => updateComment({ commentId: comment._id, content }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['timeline']);

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
