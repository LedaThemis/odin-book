import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

interface IBaseButton {
    Icon: IconType;
    text: string;
    color?: string;
    onClick?: () => void;
}

const BaseButton = ({ Icon, text, color, onClick }: IBaseButton) => {
    return (
        <StyledButton color={color} onClick={onClick}>
            <Icon size={'18px'} />
            <StyledP>{text}</StyledP>
        </StyledButton>
    );
};

const StyledButton = styled.button<{ color?: string }>`
    color: ${(props) =>
        props.color ? props.color : 'var(--secondary-text-color)'};
    border: none;
    background-color: transparent;
    cursor: pointer;

    padding: 8px 12px;
    width: 100%;
    border-radius: var(--standard-border-radius);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

const StyledP = styled.p`
    margin: 0;
    font-size: 15px;
    font-weight: 600;
`;

export default BaseButton;
