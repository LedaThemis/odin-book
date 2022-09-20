import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import areFriends from '../lib/areFriends';
import getUserURL from '../lib/getUserURL';
import { IUser } from '../lib/interfaces/User';
import SectionBase from './bases/SectionBase';
import MessageButton from './buttons/MessageButton';
import UserIcon from './icons/UserIcon';

interface UsersSectionBarProps {
    user: IUser;
}

const UsersSectionBar = ({ user }: UsersSectionBarProps) => {
    const currentUser = useCurrentUser() as IUser;

    return (
        <StyledFlexWrapper>
            <StyledFlexRowWrapper>
                <StyledLink to={getUserURL(user)}>
                    <UserIcon user={user} size={'60px'} />
                </StyledLink>
                <StyledLink to={getUserURL(user)}>
                    {user.displayName}
                </StyledLink>
            </StyledFlexRowWrapper>
            {areFriends(currentUser, user) && (
                <MessageButton userId={user._id} />
            )}
        </StyledFlexWrapper>
    );
};

interface IUsersSection {
    users: IUser[];
    title: string;
    noUsersText?: string;
}

const UsersSection = ({ users, title, noUsersText }: IUsersSection) => {
    return (
        <SectionBase title={title}>
            {users.length > 0
                ? users.map((user) => (
                      <UsersSectionBar
                          key={`people-searchresult-userbar-${user._id}`}
                          user={user}
                      />
                  ))
                : noUsersText && <StyledInfo>{noUsersText}</StyledInfo>}
        </SectionBase>
    );
};

const StyledFlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledFlexRowWrapper = styled.div`
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

export default UsersSection;
