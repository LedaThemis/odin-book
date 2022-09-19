import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { IoIosImages, IoMdSend } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import useChatRoom from '../hooks/useChatRoom';
import useChatRoomMessages from '../hooks/useChatRoomMessages';
import areSameUser from '../lib/areSameUser';
import getUserURL from '../lib/getUserURL';
import { IChatRoom } from '../lib/interfaces/ChatRoom';
import { IMessage } from '../lib/interfaces/Message';
import { IUser } from '../lib/interfaces/User';
import sendMessage from '../lib/sendMessage';
import FetchingOverlay from './HOCs/FetchingOverlay';
import PostImageInputBar from './PostImageInputBar';
import RoomMessage from './RoomMessage';
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

interface IRoomMessages {
    roomId: string;
}

const RoomMessages = ({ roomId }: IRoomMessages) => {
    const currentUser = useCurrentUser() as IUser;
    const roomMessagesQuery = useChatRoomMessages(roomId);

    return (
        <StyledMessagesContainerWrapper>
            <StyledMessagesContainer>
                <FetchingOverlay isFetching={roomMessagesQuery.isLoading}>
                    {roomMessagesQuery.isSuccess &&
                        (roomMessagesQuery.data.length === 0 ? (
                            <p>You don&apos;t have any messages with user.</p>
                        ) : (
                            roomMessagesQuery.data.map((m) => (
                                <RoomMessage
                                    key={m._id}
                                    message={m}
                                    roomId={roomId}
                                    bySelf={areSameUser(currentUser, m.author)}
                                />
                            ))
                        ))}
                </FetchingOverlay>
            </StyledMessagesContainer>
        </StyledMessagesContainerWrapper>
    );
};

interface IMessageCreateBar {
    roomId: string;
}

const MessageCreateBar = ({ roomId }: IMessageCreateBar) => {
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState<string[]>([]);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => sendMessage({ roomId, content, attachments }),
        {
            onSuccess: (message) => {
                queryClient.setQueryData<IMessage[]>(
                    ['chat', 'rooms', roomId, 'messages'],
                    (old = []) => old.concat(message),
                );

                setContent('');
                setAttachments([]);
            },
        },
    );

    const handleImageAddClick = () => {
        setAttachments((prev) => prev.concat(['']));
    };

    const handleImageInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
    ) => {
        setAttachments((prev) =>
            prev.map((v, i) => (i === id ? e.target.value : v)),
        );
    };

    const handleImageInputRemove = (id: number) => {
        setAttachments((prev) => prev.slice(0, id).concat(prev.slice(id + 1)));
    };

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) {
            e.preventDefault();
        }

        mutation.mutate();
    };

    return (
        <StyledWrapper>
            <StyledPostImagesContainer>
                {attachments.map((attachmentURL, id) => (
                    <PostImageInputBar
                        currentValue={attachmentURL}
                        handleImageInputChange={(e) =>
                            handleImageInputChange(e, id)
                        }
                        handleImageInputRemove={() =>
                            handleImageInputRemove(id)
                        }
                        key={`messageattachmentinputbar-${id}`}
                    />
                ))}
            </StyledPostImagesContainer>
            <StyledMessageInputContainer>
                <StyledAttachmentsButton onClick={handleImageAddClick}>
                    <IoIosImages size={'24px'} color="var(--primary-color)" />
                </StyledAttachmentsButton>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledMessageTextArea
                        placeholder="Aa"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSubmit();
                            }
                        }}
                    />
                    <StyledSendButton type="submit">
                        <IoMdSend
                            size={'24px'}
                            color={
                                content.length === 0
                                    ? 'grey'
                                    : 'var(--primary-color)'
                            }
                        />
                    </StyledSendButton>
                </StyledForm>
            </StyledMessageInputContainer>
        </StyledWrapper>
    );
};

const Room = () => {
    const params = useParams();
    const roomQuery = useChatRoom(`${params.roomId}`);

    return (
        <StyledContainer>
            <FetchingOverlay isFetching={roomQuery.isLoading}>
                {roomQuery.isSuccess && (
                    <>
                        <RoomHeader room={roomQuery.data} />
                        <RoomMessages roomId={roomQuery.data._id} />
                        <MessageCreateBar roomId={roomQuery.data._id} />
                    </>
                )}
            </FetchingOverlay>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

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

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledMessageInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    padding: 12px 4px;
`;

const StyledButtonBase = styled.button`
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 4px;

    background-color: white;

    &:hover {
        background-color: var(--hover-background-color);
    }

    border-radius: 50%;

    cursor: pointer;
`;

const StyledPostImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin: 0 12px;
`;

const StyledAttachmentsButton = styled(StyledButtonBase)``;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    gap: 4px;

    flex-grow: 1;
`;

const StyledMessageTextArea = styled.textarea`
    padding-left: 15px;
    padding-top: 7.5px; // half font size
    box-sizing: border-box;

    display: flex;

    border: none;
    resize: none;

    height: 36px;
    background-color: var(--background-color);
    color: var(--primary-text-color);

    border-radius: 20px;

    font-size: 15px;
    font-family: inherit;

    flex-grow: 1;

    &:focus {
        outline: none;
    }
`;

const StyledSendButton = styled(StyledButtonBase)``;

export default Room;
