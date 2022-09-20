import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import getCurrentUserURL from '../lib/getCurrentUserURL';
import PostCreatePopup from './PostCreatePopup';
import UserIcon from './icons/UserIcon';

const PostCreatePrompt = () => {
    const user = useCurrentUser();
    const [isPopupShown, setIsPopupShown] = useState(false);

    const promptText = `What's on your mind, ${user?.displayName}?`;

    return (
        <StyledContainer>
            <Link to={getCurrentUserURL()} style={{ display: 'flex' }}>
                <UserIcon />
            </Link>
            <StyledButton
                onClick={() => setIsPopupShown((prevState) => !prevState)}
            >
                <p>{promptText}</p>
            </StyledButton>
            {isPopupShown && (
                <PostCreatePopup setIsPopupShown={setIsPopupShown} />
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    box-sizing: border-box;

    padding: 12px 16px;
    gap: 8px;

    box-shadow: 0 1px 2px var(--shadow-2);

    background-color: var(--secondary-background-color);

    border-radius: var(--standard-border-radius);
`;

const StyledButton = styled.button`
    border: none;

    display: flex;
    align-items: center;

    width: 100%;
    height: 40px;

    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 17px;

    background-color: var(--background-color);
    border-radius: 9999px;

    padding: 0 16px;
    box-sizing: border-box;

    color: var(--form-text-color);

    &:hover {
        background-color: var(--hover-background-color);
    }

    cursor: pointer;
`;

export default PostCreatePrompt;
