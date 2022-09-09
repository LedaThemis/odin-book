import { VscChromeClose } from 'react-icons/vsc';
import styled from 'styled-components';

interface IPostImageInputBar {
    currentValue: string;
    handleImageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageInputRemove: () => void;
}

const PostImageInputBar = ({
    currentValue,
    handleImageInputChange,
    handleImageInputRemove,
}: IPostImageInputBar) => {
    return (
        <StyledContainer>
            <StyledCloseButtonContainer
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.94)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onClick={handleImageInputRemove}
            >
                <VscChromeClose size={'12px'} />
            </StyledCloseButtonContainer>
            <StyledInput
                value={currentValue}
                onChange={handleImageInputChange}
                type="text"
                placeholder="Enter image URL"
            />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    position: relative;
`;

const StyledCloseButtonContainer = styled.button`
    width: 20px;
    height: 20px;

    position: absolute;
    right: -8px;
    top: -8px;

    background-color: var(--hover-background-color);

    display: grid;
    place-content: center;

    border-radius: 50%;

    &:hover {
        background-color: var(--secondary-button-background-color);
    }

    border: none;

    cursor: pointer;
`;

const StyledInput = styled.input`
    border: none;
    font-family: inherit;
    font-size: 18px;
    width: 100%;

    box-sizing: border-box;
    padding: 8px;
    border-radius: 8px;

    box-shadow: 0 1px 2px var(--shadow-2);

    &:focus {
        outline: none;
    }
`;

export default PostImageInputBar;
