import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import getUserURL from '../lib/getUserURL';
import { IChatRoom } from '../lib/interfaces/ChatRoom';
import { IUser } from '../lib/interfaces/User';
import UserIcon from './icons/UserIcon';

interface IRoomHeader {
    room: IChatRoom;
}

const RoomHeader = ({ room }: IRoomHeader) => {
    const currentUser = useCurrentUser() as IUser;
    const otherUsers = room.members.filter((u) => u._id !== currentUser._id);

    return (
        <StyledHeaderContainer>
            <StyledUserBar to={getUserURL(otherUsers[0])}>
                <UserIcon user={otherUsers[0]} />
                <StyledUsername>
                    {otherUsers.map((u) => u.displayName).join('&')}
                </StyledUsername>
            </StyledUserBar>
        </StyledHeaderContainer>
    );
};

const StyledHeaderContainer = styled.div`
    padding: 4px;

    border-bottom: 1px solid var(--section-separator-background-color);
`;

const StyledUserBar = styled(Link)`
    max-width: fit-content;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;

    padding: 2px 6px;
    border-radius: 8px;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

const StyledUsername = styled.p`
    color: var(--primary-text-color);
    font-size: 15px;
`;

export default RoomHeader;
