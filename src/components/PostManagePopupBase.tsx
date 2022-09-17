import { UseMutationResult } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styled from 'styled-components';

import { useUser } from '../context/UserProvider';
import { IPost } from '../lib/interfaces/Post';
import PostAddMediaBar from './PostAddMediaBar';
import PostHeader from './PostHeader';
import PostImageInputBar from './PostImageInputBar';

interface IPostBody {
    content: string;
    photos: string[];
}

const isSameAsInitialState = (
    content: IPostBody['content'],
    photos: IPostBody['photos'],
    initialState: IPostBody,
) => {
    return (
        content === initialState.content &&
        JSON.stringify(photos) === JSON.stringify(initialState.photos)
    );
};
interface IPostManagePopup {
    title: string;
    submitButtonText: string;
    originalPost?: IPost;
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
    mutation: UseMutationResult<IPost, unknown, IPostBody, unknown>;
}

const PostManagePopupBase = ({
    title,
    submitButtonText,
    originalPost,
    setIsPopupShown,
    mutation,
}: IPostManagePopup) => {
    const initialState = useMemo(() => {
        if (originalPost) {
            return {
                content: originalPost.content,
                photos: originalPost.photos,
            };
        } else {
            return {
                content: '',
                photos: [],
            };
        }
    }, []);

    const user = useUser();

    const [content, setContent] = useState(initialState.content);
    const [photos, setPhotos] = useState<string[]>(initialState.photos);

    const handleImageAddClick = () => {
        setPhotos((prevPhotos) => prevPhotos.concat(['']));
    };

    const handleImageInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
    ) => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((v, i) => (i === id ? e.target.value : v)),
        );
    };

    const handleImageInputRemove = (id: number) => {
        setPhotos((prevPhotos) =>
            prevPhotos.slice(0, id).concat(prevPhotos.slice(id + 1)),
        );
    };

    return (
        <StyledOverlay>
            <StyledContainer>
                <StyledPostManageTopContainer>
                    <StyledPostManageHeader>
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
                            onClick={() => setIsPopupShown(false)}
                        >
                            <StyledVscChromeClose size={'20px'} />
                        </StyledCloseButtonContainer>
                    </StyledPostManageHeader>

                    <StyledLineContainer />
                    <PostHeader />
                    <StyledTextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user?.displayName}?`}
                    />
                </StyledPostManageTopContainer>
                <StyledPostManageBottomContainer>
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
                        onClick={() => {
                            mutation.mutate({ content, photos });
                        }}
                        disabled={
                            content.trim().length === 0 ||
                            mutation.isLoading ||
                            isSameAsInitialState(content, photos, initialState)
                        }
                    >
                        {submitButtonText}
                    </StyledSubmitButton>
                </StyledPostManageBottomContainer>
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

    background-color: white;

    box-sizing: border-box;
    padding: 6px 12px;

    width: 500px;
    height: 428px;

    overflow-y: scroll;

    text-align: center;
`;

const StyledPostManageTopContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
`;

const StyledPostManageHeader = styled.div`
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

const StyledPostManageBottomContainer = styled.div`
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

export default PostManagePopupBase;
