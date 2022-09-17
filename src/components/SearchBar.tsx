import { useState } from 'react';
import styled from 'styled-components';

import useDebounce from '../hooks/useDebounce';
import useUsersSearchQuery from '../hooks/useQuerySearch';
import SearchResultsDisplay from './SearchResultsDisplay';
import SearchIcon from './icons/SearchIcon';

const SearchBar = () => {
    const params = new URL(document.URL).searchParams;
    const queryParam = params.get('q');

    const [query, setQuery] = useState(queryParam ? queryParam : '');

    const debouncedQuery = useDebounce(query, 500);

    const resultsQuery = useUsersSearchQuery(debouncedQuery);

    const [hasTyped, setHasTyped] = useState(false);

    return (
        <StyledContainer>
            <StyledSpan>
                <SearchIcon />
            </StyledSpan>
            <StyledInput
                type="text"
                placeholder="Search Facebook"
                value={query}
                onChange={(e) => {
                    setHasTyped(true);
                    setQuery(e.target.value);
                }}
            />
            {hasTyped && query.length > 1 && resultsQuery.isSuccess && (
                <SearchResultsDisplay
                    query={query}
                    users={resultsQuery.data}
                    hide={() => {
                        setHasTyped(false);
                    }}
                />
            )}
        </StyledContainer>
    );
};
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--background-color);
    padding: 8px 16px;
    border-radius: 9999px;
    box-sizing: border-box;

    @media screen and (max-width: 900px) {
        padding-left: 4px;
        padding-right: 4px;
    }

    @media screen and (max-width: 750px) {
        width: 80px;
    }
`;

const StyledSpan = styled.span`
    box-sizing: border-box;
    display: flex;

    @media screen and (max-width: 900px) {
        display: none;
    }
`;

const StyledInput = styled.input`
    border: none;
    font-family: Roboto, sans-serif;
    background-color: inherit;
    color: var(--form-text-color);
    width: 100%;

    &:focus {
        outline: none;
    }
`;

export default SearchBar;
