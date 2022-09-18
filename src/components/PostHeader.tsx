import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import getCurrentUserURL from '../lib/getCurrentUserURL';
import UserIcon from './icons/UserIcon';

const PostHeader = () => {
    const user = useCurrentUser();

    return (
        <StyledContainer>
            <Link to={getCurrentUserURL()} style={{ display: 'flex' }}>
                <UserIcon />
            </Link>
            <p>{user?.displayName}</p>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export default PostHeader;
