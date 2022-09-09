import styled from 'styled-components';

import UserIcon from './icons/UserIcon';

interface ICommentCreatePrompt {
    className?: string;
}

const CommentCreatePrompt = ({ className }: ICommentCreatePrompt) => {
    return (
        <StyledContainer className={className}>
            <UserIcon size="34px" />
            <StyledWrapper>
                <StyledInput type="text" placeholder="Write a comment..." />
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

const StyledInput = styled.input`
    border: none;

    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 15px;

    background-color: var(--background-color);
    border-radius: 9999px;

    padding: 8px 12px;

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
