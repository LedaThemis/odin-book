import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface MenuBarProps {
    text: string;
    Icon: IconType;
    destination?: string;
    onClick?: () => void;
}
const MenuBar = ({ text, Icon, onClick, destination }: MenuBarProps) => {
    const navigate = useNavigate();

    return (
        <StyledContainer
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (destination) {
                    navigate(destination);
                }
            }}
        >
            <StyledIconWrapper>{<Icon size={'20px'} />}</StyledIconWrapper>{' '}
            <StyledMenuTitle>{text}</StyledMenuTitle>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding-left: 8px;

    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
        border-radius: 10px;
    }
`;

const StyledIconWrapper = styled.div`
    background-color: #e4e6eb;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-content: center;
`;

const StyledMenuTitle = styled.p`
    font-family: Roboto, sans-serif;
`;

export default MenuBar;
