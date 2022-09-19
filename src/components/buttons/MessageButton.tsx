import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import startConversation from '../../lib/startConversation';
import MessagesIcon from '../icons/MessagesIcon';

interface IMessageButton {
    userId: string;
}

const MessageButton = ({ userId }: IMessageButton) => {
    const navigate = useNavigate();

    const mutation = useMutation(() => startConversation({ userId }), {
        onSuccess: (room) => {
            navigate(`/messages/${room._id}`);
        },
    });

    return (
        <StyledButton onClick={() => mutation.mutate()}>
            <MessagesIcon />
        </StyledButton>
    );
};

const StyledButton = styled.button`
    display: flex;
    border: none;
    margin: 0;

    padding: 8px;

    border-radius: 50%;

    cursor: pointer;
`;

export default MessageButton;
