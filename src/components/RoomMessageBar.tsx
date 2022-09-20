import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoIosImages, IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

import { IMessage } from '../lib/interfaces/Message';
import sendMessage from '../lib/sendMessage';
import PostImageInputBar from './PostImageInputBar';

interface RoomMessageBarProps {
    roomId: string;
}

const RoomMessageBar = ({ roomId }: RoomMessageBarProps) => {
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

export default RoomMessageBar;
