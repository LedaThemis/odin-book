import { BsPersonCheckFill } from 'react-icons/bs';
import styled from 'styled-components';

interface ICancelFriendRequestButton {
    onClick: () => void;
}

const CancelFriendRequestButton = ({ onClick }: ICancelFriendRequestButton) => {
    return (
        <StyledContainer
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
            <BsPersonCheckFill size={'24px'} />
            <StyledButtonText>Friend Request Sent</StyledButtonText>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    background-color: var(--background-color);
    color: black;
    border: none;

    border-radius: var(--standard-border-radius);

    padding: 8px 12px;
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

export default CancelFriendRequestButton;
