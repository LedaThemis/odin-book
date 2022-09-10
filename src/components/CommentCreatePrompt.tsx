import { useState } from 'react';
import styled from 'styled-components';

import createPostComment from '../lib/createPostComment';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import Errors from './Errors';
import UserIcon from './icons/UserIcon';

interface ICommentCreatePrompt {
    post: IPost;
    className?: string;
}

const CommentCreatePrompt = ({ post, className }: ICommentCreatePrompt) => {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (content.length < 1) return;

        const res = await createPostComment({ postId: post._id, content });

        switch (res.state) {
            case 'success':
                setContent('');
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
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
                {errors.length > 0 && <Errors errors={errors} />}
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
