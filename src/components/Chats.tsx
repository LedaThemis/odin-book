import styled from 'styled-components';

import useConversations from '../hooks/useConversations';
import ChatBar from './ChatBar';
import FetchingOverlay from './HOCs/FetchingOverlay';

const NoChatsYet = () => (
    <div>
        <p>Looks like you haven&apos;t started any conversation yet.</p>
        <p>
            You can do so by clicking the message icon near any of your friends.
        </p>
    </div>
);

const Chats = () => {
    const conversationsQuery = useConversations();

    return (
        <FetchingOverlay isFetching={conversationsQuery.isLoading}>
            {conversationsQuery.isSuccess &&
                (conversationsQuery.data.length === 0 ? (
                    <NoChatsYet />
                ) : (
                    <StyledChatBarContainer>
                        {conversationsQuery.data.map((room) => (
                            <ChatBar key={room._id} room={room} />
                        ))}
                    </StyledChatBarContainer>
                ))}
        </FetchingOverlay>
    );
};

const StyledChatBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export default Chats;
