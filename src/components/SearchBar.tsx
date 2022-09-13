import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import queryUsers from '../lib/queryUsers';
import SearchResultsDisplay from './SearchResultsDisplay';
import SearchIcon from './icons/SearchIcon';

const SearchBar = () => {
    const params = new URL(document.URL).searchParams;
    const queryParam = params.get('q');

    const [hasTyped, setHasTyped] = useState(false);
    const [query, setQuery] = useState(queryParam ? queryParam : '');
    const [results, setResults] = useState<IUser[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        if (query.length < 1) return;

        (async () => {
            const res = await queryUsers({ q: query });

            switch (res.state) {
                case 'success':
                    setErrors([]);
                    setResults(res.users);
                    break;

                case 'failed':
                    setResults([]);
                    setErrors(res.errors);
                    break;
            }
        })();
    }, [query]);

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
            {hasTyped && query.length > 1 && (
                <SearchResultsDisplay
                    query={query}
                    users={results}
                    errors={errors}
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
