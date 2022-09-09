import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styled from 'styled-components';

import { useUser } from '../context/UserProvider';
import createPost from '../lib/createPost';
import { ErrorType } from '../lib/interfaces/Error';
import Errors from './Errors';
import PostAddMediaBar from './PostAddMediaBar';
import PostHeader from './PostHeader';
import PostImageInputBar from './PostImageInputBar';

interface IPostCreatePopup {
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreatePopup = ({ setIsPopupShown }: IPostCreatePopup) => {
    const user = useUser();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [content, setContent] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleImageAddClick = () => {
        setPhotos(photos.concat(['']));
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setPhotos((prevPhotos) =>
            prevPhotos
                .slice(0, id)
                .concat([e.target.value])
                .concat(prevPhotos.slice(id + 1)),
        );
    };

    const handleImageInputRemove = (id: number) => {
        setPhotos((prevPhotos) =>
            prevPhotos.slice(0, id).concat(prevPhotos.slice(id + 1)),
        );
    };

    const handleSubmit = async () => {
        setIsSubmitDisabled(true);
        const res = await createPost({ content, photos });
        setIsSubmitDisabled(false);

        switch (res.state) {
            case 'success':
                setIsPopupShown(false);
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    return (
        <StyledOverlay>
            <StyledContainer>
                <StyledPostCreateTopContainer>
                    <StyledPostCreateHeader>
                        <StyledH2>Create Post</StyledH2>
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
                            onClick={() => setIsPopupShown(false)}
                        >
                            <StyledVscChromeClose size={'20px'} />
                        </StyledCloseButtonContainer>
                    </StyledPostCreateHeader>

                    <StyledLineContainer />
                    <PostHeader />
                    <StyledTextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user?.displayName}?`}
                    />
                </StyledPostCreateTopContainer>
                <StyledPostCreateBottomContainer>
                    <StyledPostImagesContainer>
                        {photos.map((photoURL, id) => (
                            <PostImageInputBar
                                currentValue={photoURL}
                                handleImageInputChange={(e) =>
                                    handleImageInputChange(e, id)
                                }
                                handleImageInputRemove={() =>
                                    handleImageInputRemove(id)
                                }
                                key={`postimageinputbar-${id}`}
                            />
                        ))}
                    </StyledPostImagesContainer>
                    <PostAddMediaBar
                        handleImageAddClick={handleImageAddClick}
                    />
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
                        onClick={handleSubmit}
                        disabled={content.length < 32 || isSubmitDisabled}
                    >
                        Post
                    </StyledSubmitButton>
                    <Errors errors={errors} />
                </StyledPostCreateBottomContainer>
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
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    box-shadow: var(--card-box-shadow);
    border-radius: var(--standard-border-radius);

    background-color: white;

    box-sizing: border-box;
    padding: 6px 12px;

    width: 500px;
    height: 428px;

    overflow-y: scroll;

    text-align: center;
`;

const StyledPostCreateTopContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
`;

const StyledPostCreateHeader = styled.div`
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

const StyledTextArea = styled.textarea`
    font-family: inherit;
    font-size: 24px;

    resize: none;
    border: none;

    height: 100%;

    &:focus {
        outline: none;
    }

    margin-top: 8px;
`;

const StyledPostCreateBottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledPostImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StyledSubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    font-family: inherit;

    border-radius: 6px;

    padding: 8px 0;

    background-color: var(--primary-button-color);
    color: white;

    &:disabled {
        background-color: var(--disabled-button-background-color);
        color: var(--disabled-button-text-color);
    }

    cursor: pointer;

    border: none;
`;

export default PostCreatePopup;
