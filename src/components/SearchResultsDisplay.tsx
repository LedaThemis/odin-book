import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import Errors from './Errors';
import SearchIcon from './icons/SearchIcon';

function isLastItemOfList<T>(arr: T[], index: number) {
    return arr.length - 1 === index;
}

interface IRenderText {
    isHighlighted: boolean;
    text: string;
}

const RenderText = ({ isHighlighted, text }: IRenderText) => {
    return isHighlighted ? (
        <StyledHighlightedText>{text}</StyledHighlightedText>
    ) : (
        <StyledNormalText>{text}</StyledNormalText>
    );
};

interface ISearchActionMenuBar {
    query: string;
    text: string;
}

const SearchActionMenuBar = ({ text, query }: ISearchActionMenuBar) => {
    return (
        <StyledActionMenuBarContainer>
            <StyledIconWrapper>{<SearchIcon />}</StyledIconWrapper>
            <StyledSearchBar>
                {text.split(' ').map((t, i) => (
                    <RenderText
                        key={`search-display-text-span-${t}`}
                        text={
                            isLastItemOfList(text.split(' '), i) ? t : t + ' '
                        }
                        isHighlighted={query
                            .split(' ')
                            .some((v) => v.includes(t))}
                    />
                ))}
            </StyledSearchBar>
        </StyledActionMenuBarContainer>
    );
};

interface ISearchResultsDisplay {
    query: string;
    users: IUser[];
    errors: ErrorType[];
    hide: () => void;
}

const SearchResultsDisplay = ({
    query,
    users,
    errors,
    hide,
}: ISearchResultsDisplay) => {
    return (
        <StyledSearchResultsDisplay>
            {users.map((user) => (
                <StyledLink
                    key={`user-search-result-${user._id}`}
                    to={`/search?q=${user.displayName}`}
                    onClick={hide}
                >
                    <SearchActionMenuBar
                        query={query}
                        text={user.displayName}
                    />
                </StyledLink>
            ))}
            <StyledSpecialLink to={`/search?q=${query}`} onClick={hide}>
                <SearchActionMenuBar
                    query={query}
                    text={`Search for ${query}`}
                />
            </StyledSpecialLink>
            <Errors errors={errors} />
        </StyledSearchResultsDisplay>
    );
};

const StyledSearchResultsDisplay = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 344px;
    max-height: 380px;
    position: absolute;
    box-shadow: var(--search-box-shadow);
    overflow-y: scroll;

    border-radius: 0 0 10px 10px;

    left: 0px;
    top: 54px;

    box-sizing: border-box;
    padding: 6px 12px;
`;

const StyledActionMenuBarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 6px;

    border-radius: 6px;

    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }
`;

const StyledIconWrapper = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-content: center;

    background-color: var(--web-wash-background-color);
`;

const StyledSearchBar = styled.p`
    margin: 0;
    font-size: 15px;

    font-family: Roboto, sans-serif;
`;

const StyledHighlightedText = styled.span`
    font-size: 15px;
`;

const StyledNormalText = styled.span`
    font-weight: 600;
`;

const StyledSpecialLink = styled(Link)`
    color: var(--primary-color);
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export default SearchResultsDisplay;
