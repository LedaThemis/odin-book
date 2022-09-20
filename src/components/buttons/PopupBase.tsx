import { VscChromeClose } from 'react-icons/vsc';
import styled from 'styled-components';

interface IPopupBase {
    title: string;
    content: string;
    submitButtonText: string;
    cancelButtonText: string;
    submitButtonFunction: () => void;
    cancelButtonFunction: () => void;
    hidePopup: () => void;
}

const PopupBase = ({
    title,
    content,
    submitButtonText,
    cancelButtonText,
    submitButtonFunction,
    cancelButtonFunction,
    hidePopup,
}: IPopupBase) => {
    return (
        <StyledOverlay>
            <StyledContainer>
                <StyledPopupBaseTopContainer>
                    <StyledPopupBaseHeader>
                        <StyledH2>{title}</StyledH2>
                        <StyledCloseButtonContainer
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'scale(0.96)';
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = '';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                            }}
                            onClick={hidePopup}
                        >
                            <StyledVscChromeClose size={'20px'} />
                        </StyledCloseButtonContainer>
                    </StyledPopupBaseHeader>
                    <StyledLineContainer />
                    <StyledContent>{content}</StyledContent>
                </StyledPopupBaseTopContainer>
                <StyledPopupBaseBottomContainer>
                    <StyledCancelButton
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'scale(0.978632)';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = '';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = '';
                        }}
                        onClick={cancelButtonFunction}
                    >
                        {cancelButtonText}
                    </StyledCancelButton>
                    <StyledSubmitButton
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'scale(0.978632)';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = '';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = '';
                        }}
                        onClick={submitButtonFunction}
                    >
                        {submitButtonText}
                    </StyledSubmitButton>
                </StyledPopupBaseBottomContainer>
            </StyledContainer>
        </StyledOverlay>
    );
};

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--overlay-background-color);

    display: grid;
    place-content: center;

    z-index: 1;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    box-shadow: var(--card-box-shadow);
    border-radius: var(--standard-border-radius);

    background-color: var(--secondary-background-color);

    box-sizing: border-box;
    padding: 6px 12px;

    width: 500px;

    overflow-y: scroll;

    text-align: center;
`;

const StyledPopupBaseTopContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
`;

const StyledPopupBaseHeader = styled.div`
    position: relative;
`;

const StyledH2 = styled.h2`
    margin: 20px 0;
`;

const StyledCloseButtonContainer = styled.button`
    width: 36px;
    height: 36px;

    position: absolute;
    right: 4px;
    top: 14px;

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

const StyledVscChromeClose = styled(VscChromeClose)``;

const StyledLineContainer = styled.div`
    margin: 0 -12px;
    margin-bottom: 8px;
    border-top: 1px solid #eee;
`;

const StyledContent = styled.p`
    margin: 0;
    padding: 12px 16px;
`;

const StyledPopupBaseBottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    padding: 12px 0;
`;

const StyledSubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    font-family: inherit;

    border-radius: 6px;

    padding: 0 40px;
    height: 36px;

    background-color: var(--primary-button-color);
    color: var(--secondary-background-color);

    &:disabled {
        background-color: var(--disabled-button-background-color);
        color: var(--disabled-button-text-color);
    }

    cursor: pointer;

    border: none;
`;

const StyledCancelButton = styled.button`
    font-weight: 600;
    font-size: 15px;
    font-family: inherit;

    border-radius: 6px;

    padding: 0 12px;
    height: 36px;

    background-color: transparent;

    color: var(--primary-deemphasized-button-text);

    &:hover {
        background-color: var(--hover-background-color);
    }

    cursor: pointer;

    border: none;
`;

export default PopupBase;
