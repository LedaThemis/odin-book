import styled from 'styled-components';

interface ISectionBase {
    title: string;
    children: React.ReactNode;
}

const SectionBase = ({ title, children }: ISectionBase) => {
    return (
        <StyledContainer>
            <StyledSectionTitle>{title}</StyledSectionTitle>
            {children}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    box-sizing: border-box;

    padding: 12px 16px;
    gap: 8px;

    width: 100%;

    box-shadow: 0 1px 2px var(--shadow-2);

    background-color: white;

    border-radius: var(--standard-border-radius);
`;

const StyledSectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    margin: 8px 0;
`;

export default SectionBase;
