import styled from "styled-components";

interface PostPhotosProps {
    photos: string[];
}

const PostPhotos = ({ photos }: PostPhotosProps) => {
    return (
        <StyledImagesContainer>
            {photos.map((photo, id) => (
                <StyledImageContainer key={`post-photo-${id}-${photo}`}>
                    <StyledImage src={photo} referrerPolicy="no-referrer" />
                </StyledImageContainer>
            ))}
        </StyledImagesContainer>
    );
};

const StyledImagesContainer = styled.div`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    max-height: 500px;
    overflow-y: scroll;
`;

const StyledImageContainer = styled.div`
    display: flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`;

const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

export default PostPhotos;
