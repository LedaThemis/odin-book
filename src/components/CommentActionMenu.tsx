import styled from 'styled-components';

interface ICommentActionMenuBar {
    text: string;
    onClick: () => void;
}

const CommentActionMenuBar = ({ text, onClick }: ICommentActionMenuBar) => {
    return (
        <StyledActionMenuBarContainer onClick={onClick}>
            <StyledMenuTitle>{text}</StyledMenuTitle>
        </StyledActionMenuBarContainer>
    );
};

interface ICommentActionMenu {
    handleEditComment: () => void;
    handleDeleteComment: () => void;
    showEdit: boolean;
}

const CommentActionMenu = ({
    handleEditComment,
    handleDeleteComment,
    showEdit,
}: ICommentActionMenu) => {
    return (
        <StyledActionMenu>
            {showEdit && (
                <CommentActionMenuBar text="Edit" onClick={handleEditComment} />
            )}
            <CommentActionMenuBar text="Delete" onClick={handleDeleteComment} />
        </StyledActionMenu>
    );
};

const StyledActionMenu = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 344px;
    max-height: 380px;
    position: absolute;
    box-shadow: var(--card-box-shadow);
    overflow-y: scroll;
    border-radius: 10px;

    left: 0px;
    top: 32px;

    box-sizing: border-box;
    padding: 12px 8px;

    z-index: 2;
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

const StyledMenuTitle = styled.p`
    margin: 0;
    padding: 8px;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight: 500;
`;

export default CommentActionMenu;
