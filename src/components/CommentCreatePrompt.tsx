import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import createPostComment from '../lib/createPostComment';
import { IPost } from '../lib/interfaces/Post';
import UserIcon from './icons/UserIcon';

interface ICommentCreatePrompt {
    post: IPost;
    className?: string;
}

const CommentCreatePrompt = ({ post, className }: ICommentCreatePrompt) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => createPostComment({ postId: post._id, content }),
        {
            onSuccess: (post) => {
                queryClient.setQueryData<IPost[]>(['timeline'], (old = []) =>
                    old.map((p) => (p._id === post._id ? post : p)),
                );
                setContent('');
            },
        },
    );

    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (content.length < 1) return;

        mutation.mutate();
    };

    return (
        <StyledContainer className={className}>
            <UserIcon size="34px" />
            <StyledWrapper>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        value={content}
                        placeholder="Write a comment..."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </StyledForm>
                <StyledP>Press Enter to post.</StyledP>
            </StyledWrapper>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    gap: 6px;
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
    color: var(--primary-text-color);
    font-size: 12px;
`;

export default CommentCreatePrompt;
