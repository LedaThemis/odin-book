import { useEffect, useState } from 'react';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import UsersSection from '../components/UsersSection';
import { useUser } from '../context/UserProvider';
import getUserOutgoingFriendRequests from '../lib/getOutgoingFriendRequests';
import getUserFriends from '../lib/getUserFriends';
import getUserIncomingFriendRequests from '../lib/getUserIncomingFriendRequests';
import getUserPeople from '../lib/getUserPeople';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';

const FriendsPage = () => {
    const user = useUser() as IUser;

    const [isFetching, setIsFetching] = useState(false);
    const [userFriends, setUserFriends] = useState<IUser[]>([]);
    const [userIncoming, setUserIncoming] = useState<IUser[]>([]);
    const [userOutgoing, setUserOutgoing] = useState<IUser[]>([]);
    const [userPeople, setUserPeople] = useState<IUser[]>([]);
    const [fErrors, setFErrors] = useState<ErrorType[]>([]);
    const [ifrErrors, setIFRErrors] = useState<ErrorType[]>([]);
    const [ofrErrors, setOFRErrors] = useState<ErrorType[]>([]);
    const [pErrors, setPErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            const [fRes, ifrRes, ofrRes, pRes] = await Promise.all([
                getUserFriends({ userId: user._id }),
                getUserIncomingFriendRequests(),
                getUserOutgoingFriendRequests(),
                getUserPeople(),
            ]);
            setIsFetching(false);

            switch (fRes.state) {
                case 'success':
                    setFErrors([]);
                    setUserFriends(fRes.users);
                    break;
                case 'failed':
                    setUserFriends([]);
                    setFErrors(fRes.errors);
                    break;
            }

            switch (ifrRes.state) {
                case 'success':
                    setIFRErrors([]);
                    setUserIncoming(ifrRes.users);
                    break;
                case 'failed':
                    setUserIncoming([]);
                    setIFRErrors(ifrRes.errors);
                    break;
            }

            switch (ofrRes.state) {
                case 'success':
                    setOFRErrors([]);
                    setUserOutgoing(ofrRes.users);
                    break;
                case 'failed':
                    setUserOutgoing([]);
                    setOFRErrors(ofrRes.errors);
                    break;
            }

            switch (pRes.state) {
                case 'success':
                    setPErrors([]);
                    setUserPeople(pRes.users);
                    break;
                case 'failed':
                    setUserPeople([]);
                    setPErrors(pRes.errors);
            }
        })();
    }, []);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <StyledSectionsContainer>
                    <FetchingOverlay
                        isFetching={isFetching}
                        text="Fetching friends..."
                        errors={fErrors}
                    >
                        <UsersSection
                            title="Friends"
                            users={userFriends}
                            noUsersText="No friends to show"
                        />
                    </FetchingOverlay>
                    <FetchingOverlay
                        isFetching={isFetching}
                        text="Fetching incoming friend requests..."
                        errors={ifrErrors}
                    >
                        <UsersSection
                            title="Incoming friend requests"
                            users={userIncoming}
                            noUsersText="No incoming friend requests to show"
                        />
                    </FetchingOverlay>
                    <FetchingOverlay
                        isFetching={isFetching}
                        text="Fetching outgoing friend requests..."
                        errors={ofrErrors}
                    >
                        <UsersSection
                            title="Outgoing friend requests"
                            users={userOutgoing}
                            noUsersText="No outgoing friend requests to show"
                        />
                    </FetchingOverlay>
                    <FetchingOverlay
                        isFetching={isFetching}
                        text="Fetching people you might know..."
                        errors={pErrors}
                    >
                        <UsersSection
                            title="People you might know"
                            users={userPeople}
                            noUsersText="Wait a sec... you know everyone!"
                        />
                    </FetchingOverlay>
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
