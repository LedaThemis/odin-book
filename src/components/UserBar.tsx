import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import getCurrentUserURL from '../lib/getCurrentUserURL';
import UserIcon from './icons/UserIcon';

const UserBar = () => {
    const user = useCurrentUser();

    return (
        <StyledContainer>
            <StyledUserBar to={getCurrentUserURL()}>
                <UserIcon />
                <StyledUsername>{user?.displayName}</StyledUsername>
            </StyledUserBar>
        </StyledContainer>
    );
};
const StyledContainer = styled.div`
    margin: 12px 0;
`;

const StyledUserBar = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 10px;
    padding-left: 8px;

    text-decoration: none;
    color: black;

    box-shadow: var(--card-box-shadow);

    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;
const StyledUsername = styled.p`
    font-family: Roboto, sans-serif;
    font-size: 18px;
    font-weight: 300;
`;

export default UserBar;
