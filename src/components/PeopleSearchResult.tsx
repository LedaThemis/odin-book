import { Link } from 'react-router-dom';
import styled from 'styled-components';

import getUserURL from '../lib/getUserURL';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import Errors from './Errors';
import UserIcon from './icons/UserIcon';

interface IPeopleSearchResultUserBar {
    user: IUser;
}

const PeopleSearchResultUserBar = ({ user }: IPeopleSearchResultUserBar) => {
    return (
        <StyledFlexWrapper>
            <StyledLink to={getUserURL(user)}>
                <UserIcon user={user} size={'60px'} />
            </StyledLink>
            <StyledLink to={getUserURL(user)}>{user.displayName}</StyledLink>
        </StyledFlexWrapper>
    );
};

interface IPeopleSearchResult {
    users: IUser[];
    errors: ErrorType[];
}

const PeopleSearchResult = ({ users, errors }: IPeopleSearchResult) => {
    return (
        <StyledContainer>
            <StyledSectionTitle>People</StyledSectionTitle>
            {users.length > 0 ? (
                users.map((user) => (
                    <PeopleSearchResultUserBar
                        key={`people-searchresult-userbar-${user._id}`}
                        user={user}
                    />
                ))
            ) : (
                <StyledInfo>No people found</StyledInfo>
            )}
            <Errors errors={errors} />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    box-sizing: border-box;

    padding: 12px 16px;
    gap: 8px;
    min-width: 380px;

    box-shadow: 0 1px 2px var(--shadow-2);

    background-color: white;

    border-radius: var(--standard-border-radius);
`;

const StyledSectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    margin: 8px 0;
`;

const StyledFlexWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 17px;
    font-weight: 600;
    color: inherit;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledInfo = styled.p`
    margin: 0;
    padding: 4px 0;
`;

export default PeopleSearchResult;
