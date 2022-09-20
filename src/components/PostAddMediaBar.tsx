import { IoIosImages } from 'react-icons/io';
import styled from 'styled-components';

interface PostAddMediaBarProps {
    handleImageAddClick: () => void;
}

const PostAddMediaBar = ({ handleImageAddClick }: PostAddMediaBarProps) => {
    return (
        <StyledContainer>
            <StyledP>Add to your post</StyledP>
            <StyledButton onClick={handleImageAddClick}>
                <IoIosImages size={'24px'} />
            </StyledButton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    box-shadow: 0 1px 2px var(--shadow-2);
    border: 1px solid #eee;
    border-radius: 8px;
`;

const StyledP = styled.p`
    font-weight: 600;
    font-size: 15px;
`;

const StyledButton = styled.button`
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;

    background-color: white;

    &:hover {
        background-color: var(--hover-background-color);
    }

    border-radius: 50%;

    cursor: pointer;
`;

export default PostAddMediaBar;
