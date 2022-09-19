import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import UserPeople from '../components/UserPeople';
import UsersSection from '../components/UsersSection';
import { useCurrentUser } from '../context/UserProvider';
import useIncomingFriendRequests from '../hooks/useIncomingFriendRequests';
import useOutgoingFriendRequests from '../hooks/useOutgoingFriendRequests';
import useUserFriends from '../hooks/useUserFriends';
import { IUser } from '../lib/interfaces/User';

const FriendsPage = () => {
    const user = useCurrentUser() as IUser;

    const userFriendsQuery = useUserFriends(user._id);
    const incomingFriendRequestsQuery = useIncomingFriendRequests();
    const outgoingFriendRequestsQuery = useOutgoingFriendRequests();

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <StyledSectionsContainer>
                    <FetchingOverlay
                        isFetching={userFriendsQuery.isLoading}
                        text="Fetching friends..."
                    >
                        {userFriendsQuery.isSuccess && (
                            <UsersSection
                                title="Friends"
                                users={userFriendsQuery.data}
                                noUsersText="No friends to show"
                            />
                        )}
                    </FetchingOverlay>
                    <FetchingOverlay
                        isFetching={incomingFriendRequestsQuery.isLoading}
                        text="Fetching incoming friend requests..."
                    >
                        {incomingFriendRequestsQuery.isSuccess && (
                            <UsersSection
                                title="Incoming friend requests"
                                users={incomingFriendRequestsQuery.data}
                                noUsersText="No incoming friend requests to show"
                            />
                        )}
                    </FetchingOverlay>
                    <FetchingOverlay
                        isFetching={outgoingFriendRequestsQuery.isLoading}
                        text="Fetching outgoing friend requests..."
                    >
                        {outgoingFriendRequestsQuery.isSuccess && (
                            <UsersSection
                                title="Outgoing friend requests"
                                users={outgoingFriendRequestsQuery.data}
                                noUsersText="No outgoing friend requests to show"
                            />
                        )}
                    </FetchingOverlay>
                    <UserPeople />
                </StyledSectionsContainer>
            </StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;

    padding: 16px 0;
    box-sizing: border-box;
`;

const StyledSectionsContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;

    min-width: 568px;

    @media screen and (max-width: 600px) {
        min-width: fit-content;
    }
`;

export default FriendsPage;
