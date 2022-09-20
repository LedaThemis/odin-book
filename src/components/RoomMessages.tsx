import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import useChatRoomMessages from '../hooks/useChatRoomMessages';
import areSameUser from '../lib/areSameUser';
import { IUser } from '../lib/interfaces/User';
import FetchingOverlay from './HOCs/FetchingOverlay';
import RoomMessage from './RoomMessage';

interface RoomMessagesProps {
    roomId: string;
}

const RoomMessages = ({ roomId }: RoomMessagesProps) => {
    const currentUser = useCurrentUser() as IUser;
    const roomMessagesQuery = useChatRoomMessages(roomId);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [roomMessagesQuery.data]);

    return (
        <StyledMessagesContainerWrapper>
            <StyledMessagesContainer>
                <FetchingOverlay isFetching={roomMessagesQuery.isLoading}>
                    {roomMessagesQuery.isSuccess &&
                        (roomMessagesQuery.data.length === 0 ? (
                            <p>You don&apos;t have any messages with user.</p>
                        ) : (
                            <>
                                {roomMessagesQuery.data.map((m) => (
                                    <RoomMessage
                                        key={m._id}
                                        message={m}
                                        roomId={roomId}
                                        bySelf={areSameUser(
                                            currentUser,
                                            m.author,
                                        )}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        ))}
                </FetchingOverlay>
            </StyledMessagesContainer>
        </StyledMessagesContainerWrapper>
    );
};

const StyledMessagesContainerWrapper = styled.div`
    padding-top: 8px;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    overflow-y: scroll;
`;

const StyledMessagesContainer = styled.div`
    display: grid;
    row-gap: 4px;

    padding: 0 14px;

    overflow-y: scroll;
`;

export default RoomMessages;
