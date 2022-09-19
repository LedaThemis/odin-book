import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import { IChatRoom } from '../lib/interfaces/ChatRoom';
import { IUser } from '../lib/interfaces/User';
import UserIcon from './icons/UserIcon';

interface IChatBar {
    room: IChatRoom;
}

const ChatBar = ({ room }: IChatBar) => {
    const currentUser = useCurrentUser() as IUser;
    const otherUsers = room.members.filter((u) => u._id !== currentUser._id);

    const params = useParams();

    return (
        <StyledChatBar to={room._id} isSelected={params.roomId === room._id}>
            <UserIcon user={otherUsers[0]} size={'56px'} />
            <StyledUsername>
                {otherUsers.map((u) => u.displayName).join('&')}
            </StyledUsername>
        </StyledChatBar>
    );
};

const StyledChatBar = styled(Link)<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;

    background-color: ${(props) =>
        props.isSelected ? 'var(--secondary-highlight-background-color)' : ''};

    padding: 8px;
    border-radius: 8px;

    &:hover {
        background-color: ${(props) =>
            !props.isSelected ? 'var(--hover-background-color)' : ''};
    }
`;

const StyledUsername = styled.p`
    color: var(--primary-text-color);
    font-size: 15px;
`;

export default ChatBar;
