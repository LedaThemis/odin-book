import styled from 'styled-components';

import PopupBase from './PopupBase';

interface TextPopupBaseProps {
    title: string;
    content: string;
    submitButtonText: string;
    cancelButtonText: string;
    submitButtonFunction: () => void;
    cancelButtonFunction: () => void;
    hidePopup: () => void;
}

const TextPopupBase = ({
    title,
    content,
    submitButtonText,
    cancelButtonText,
    submitButtonFunction,
    cancelButtonFunction,
    hidePopup,
}: TextPopupBaseProps) => {
    return (
        <PopupBase
            withButtons={true}
            title={title}
            Component={<StyledContent>{content}</StyledContent>}
            submitButtonText={submitButtonText}
            cancelButtonText={cancelButtonText}
            submitButtonFunction={submitButtonFunction}
            cancelButtonFunction={cancelButtonFunction}
            hidePopup={hidePopup}
        />
    );
};

const StyledContent = styled.p`
    margin: 0;
    padding: 12px 16px;
`;

export default TextPopupBase;
