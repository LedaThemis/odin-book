import styled from 'styled-components';

import SearchIcon from './icons/SearchIcon';

const SearchBar = () => {
    return (
        <StyledContainer>
            <StyledSpan>
                <SearchIcon />
            </StyledSpan>
            <StyledInput type="text" placeholder="Search Facebook" />
        </StyledContainer>
    );
};
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--background-color);
    padding: 6px 16px;
    border-radius: 9999px;
    box-sizing: border-box;
`;

const StyledSpan = styled.span`
    box-sizing: border-box;
`;

const StyledInput = styled.input`
    border: none;
    font-family: Roboto, sans-serif;
    background-color: inherit;

    &:focus {
        outline: none;
    }
`;

export default SearchBar;
