import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from 'react-icons/md';
import styled from 'styled-components';

interface IAcceptOrRejectFriendRequestButton {
    handleAccept: () => void;
    handleReject: () => void;
}

const AcceptOrRejectFriendRequestButton = ({
    handleAccept,
    handleReject,
}: IAcceptOrRejectFriendRequestButton) => {
    return (
        <StyledWrapper>
            <StyledAcceptFriend
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onClick={handleAccept}
            >
                <MdPersonAddAlt1 size={'24px'} />
                <StyledButtonText>Accept</StyledButtonText>
            </StyledAcceptFriend>
            <StyledRejectFriend
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onClick={handleReject}
            >
                <MdPersonRemoveAlt1 size={'24px'} />
                <StyledButtonText>Reject</StyledButtonText>
            </StyledRejectFriend>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    gap: 4px;
`;

const StyledAcceptFriend = styled.button`
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

const StyledRejectFriend = styled.button`
    background-color: var(--background-color);
    color: black;
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

export default AcceptOrRejectFriendRequestButton;
