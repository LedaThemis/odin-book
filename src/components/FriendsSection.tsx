import { Link } from 'react-router-dom';
import styled from 'styled-components';

import getUserURL from '../lib/getUserURL';
import { IUser } from '../lib/interfaces/User';
import UserIcon from './icons/UserIcon';

interface IFriendsSectionBar {
    user: IUser;
}

const FriendsSectionBar = ({ user }: IFriendsSectionBar) => {
    return (
        <StyledFlexWrapper>
            <StyledLink to={getUserURL(user)}>
                <UserIcon user={user} size={'60px'} />
            </StyledLink>
            <StyledLink to={getUserURL(user)}>{user.displayName}</StyledLink>
        </StyledFlexWrapper>
    );
};

interface IFriendsSection {
    users: IUser[];
    noFriendsText?: string;
}

const FriendsSection = ({ users, noFriendsText }: IFriendsSection) => {
    return (
        <StyledContainer>
            <StyledSectionTitle>Friends</StyledSectionTitle>
            {users.length > 0
                ? users.map((user) => (
                      <FriendsSectionBar
                          key={`people-searchresult-userbar-${user._id}`}
                          user={user}
                      />
                  ))
                : noFriendsText && <StyledInfo>{noFriendsText}</StyledInfo>}
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

export default FriendsSection;
