import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import styled from 'styled-components';

import deleteRoomMessage from '../lib/deleteRoomMessage';
import { IMessage } from '../lib/interfaces/Message';
import PopupBase from './buttons/PopupBase';
import UserIcon from './icons/UserIcon';

interface IRoomMessageDeletePopup {
    handleSubmit: () => void;
    hidePopup: () => void;
}

const RoomMessageDeletePopup = ({
    handleSubmit,
    hidePopup,
}: IRoomMessageDeletePopup) => {
    return (
        <PopupBase
            title="Remove for everyone?"
            content="This message will be removed for everyone."
            cancelButtonText="Cancel"
            submitButtonText="Remove"
            submitButtonFunction={handleSubmit}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
        />
    );
};

interface RoomMessageProps {
    roomId: string;
    message: IMessage;
    bySelf: boolean;
}

const RoomMessage = ({ roomId, message, bySelf }: RoomMessageProps) => {
    const [hovering, setHovering] = useState(false);
    const [isPopupShown, setIsPopupShown] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => deleteRoomMessage({ roomId, messageId: message._id }),
        {
            onSuccess: () => {
                queryClient.setQueryData<IMessage[]>(
                    ['chat', 'rooms', roomId, 'messages'],
                    (old = []) => old.filter((m) => m._id !== message._id),
                );
            },
        },
    );

    const handleSubmit = () => {
        mutation.mutate();
    };

    return (
        <>
            <StyledContainer
                bySelf={bySelf}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {!bySelf && <UserIcon user={message.author} size={'28px'} />}
                <StyledFlexWrapper>
                    {bySelf && (
                        <StyledButton
                            onClick={() => {
                                setIsPopupShown((prev) => !prev);
                            }}
                            hovering={hovering}
                        >
                            <IoTrashOutline size="20px" />
                        </StyledButton>
                    )}
                    <StyledFlexColumnWrapper>
                        <StyledContent bySelf={bySelf}>
                            {message.content}
                        </StyledContent>
                        {message.attachments.length > 0 && (
                            <StyledAttachments>
                                {message.attachments.map((atch, id) => (
                                    <StyledAttachment key={id} src={atch} />
                                ))}
                            </StyledAttachments>
                        )}
                    </StyledFlexColumnWrapper>
                </StyledFlexWrapper>
            </StyledContainer>
            {isPopupShown && (
                <RoomMessageDeletePopup
                    handleSubmit={handleSubmit}
                    hidePopup={() => {
                        setIsPopupShown(false);
                    }}
                />
            )}
        </>
    );
};

const StyledContainer = styled.div<{ bySelf: boolean }>`
    display: flex;
    gap: 8px;
    align-items: flex-end;

    justify-self: ${(props) => (props.bySelf ? 'flex-end' : 'flex-start')};
`;

const StyledFlexWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StyledFlexColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StyledButton = styled.button<{ hovering: boolean }>`
    visibility: ${(props) => (props.hovering ? 'visibile' : 'hidden')};

    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 4px;

    background-color: transparent;

    &:hover {
        background-color: var(--hover-background-color);
    }

    border-radius: 50%;

    cursor: pointer;
`;

const StyledContent = styled.p<{ bySelf: boolean }>`
    max-width: 300px;

    margin: 0;
    font-size: 15px;

    white-space: pre-line;
    overflow-wrap: break-word;

    padding: 8px 12px;

    border-radius: 18px;

    color: ${(props) => (props.bySelf ? 'white' : 'var(--primary-text-color)')};

    background-color: ${(props) =>
        props.bySelf
            ? 'var(--primary-color)'
            : 'var(--message-background-color)'};

    @media screen and (max-width: 600px) {
        max-width: 200px;
    }

    @media screen and (max-width: 500px) {
        max-width: 150px;
    }
`;

const StyledAttachments = styled.div`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    max-height: 300px;
    max-width: 300px;

    overflow-y: scroll;

    border-radius: 2px;

    border: 2px solid var(--background-color);

    @media screen and (max-width: 600px) {
        max-width: 200px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
`;

const StyledAttachment = styled.img`
    object-fit: cover;
    width: 100%;
`;

export default RoomMessage;
