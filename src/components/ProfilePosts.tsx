import styled from 'styled-components';

interface ProfilePostsSectionProps {
    hasPosts: boolean;
    canSeePosts: boolean;
}

const ProfilePostsSection = ({
    hasPosts,
    canSeePosts,
}: ProfilePostsSectionProps) => {
    return (
        <StyledContainer>
            <StyledSectionTitle>Posts</StyledSectionTitle>
            {canSeePosts ? (
                !hasPosts && <StyledInfo>This user has no posts.</StyledInfo>
            ) : (
                <StyledInfo>
                    You need to be friends with this user to see posts.
                </StyledInfo>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    box-sizing: border-box;
    padding: 12px 16px;
    gap: 8px;

    box-shadow: 0 1px 2px var(--shadow-2);

    background-color: var(--secondary-background-color);

    border-radius: var(--standard-border-radius);
`;

const StyledSectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    margin: 8px 0;
`;

const StyledInfo = styled.p`
    margin: 0;
    padding: 4px 0;
`;

export default ProfilePostsSection;
