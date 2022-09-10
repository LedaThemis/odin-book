import { IconType } from 'react-icons';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import styled from 'styled-components';

interface IPostActionMenuBar {
    Icon: IconType;
    text: string;
    onClick: () => void;
}

const PostActionMenuBar = ({ Icon, text, onClick }: IPostActionMenuBar) => {
    return (
        <StyledActionMenuBarContainer onClick={onClick}>
            <StyledIconWrapper>{<Icon size={'20px'} />}</StyledIconWrapper>{' '}
            <StyledMenuTitle>{text}</StyledMenuTitle>
        </StyledActionMenuBarContainer>
    );
};

interface IPostActionMenu {
    handleEditPost: () => void;
    handleDeletePost: () => void;
}

const PostActionMenu = ({
    handleEditPost,
    handleDeletePost,
}: IPostActionMenu) => {
    return (
        <StyledActionMenu>
            <PostActionMenuBar
                Icon={HiOutlinePencil}
                text="Edit post"
                onClick={handleEditPost}
            />
            <StyledLineContainer />
            <PostActionMenuBar
                Icon={IoTrashOutline}
                text="Move to trash"
                onClick={handleDeletePost}
            />
        </StyledActionMenu>
    );
};

const StyledLineContainer = styled.div`
    border-top: 1px solid #eee;
`;

const StyledActionMenu = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 344px;
    max-height: 380px;
    position: absolute;
    box-shadow: var(--card-box-shadow);
    overflow-y: scroll;
    border-radius: 10px;

    right: 16px;
    top: 58px;

    box-sizing: border-box;
    padding: 6px 12px;
`;

const StyledActionMenuBarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    border-radius: 6px;

    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

const StyledIconWrapper = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-content: center;
`;

const StyledMenuTitle = styled.p`
    margin: 0;
    font-family: Roboto, sans-serif;
`;

export default PostActionMenu;
