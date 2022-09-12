import { MdPersonAddAlt1 } from 'react-icons/md';
import styled from 'styled-components';

interface IAddFriendButton {
    onClick: () => void;
}

const AddFriendButton = ({ onClick }: IAddFriendButton) => {
    return (
        <StyledAddFriend
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = '';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
            }}
            onClick={onClick}
        >
            <MdPersonAddAlt1 size={'24px'} />
            <StyledButtonText>Add Friend</StyledButtonText>
        </StyledAddFriend>
    );
};

const StyledAddFriend = styled.button`
    background-color: var(--primary-color);
    color: white;
    border: none;

    border-radius: var(--standard-border-radius);

    padding: 8px 8px;
    box-sizing: border-box;

    display: flex;
    gap: 4px;
    align-items: center;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
        filter: brightness(0.97);
    }
`;

const StyledButtonText = styled.p`
    margin: 0;
`;

export default AddFriendButton;
