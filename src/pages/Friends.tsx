import { useEffect, useState } from 'react';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import UsersSection from '../components/UsersSection';
import { useUser } from '../context/UserProvider';
import getUserFriends from '../lib/getUserFriends';
import getUserPeople from '../lib/getUserPeople';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';

const FriendsPage = () => {
    const user = useUser() as IUser;

    const [isFetchingFriends, setIsFetchingFriends] = useState(false);
    const [isFetchingPeople, setIsFetchingPeople] = useState(false);
    const [userFriends, setUserFriends] = useState<IUser[]>([]);
    const [userPeople, setUserPeople] = useState<IUser[]>([]);
    const [fErrors, setFErrors] = useState<ErrorType[]>([]);
    const [pErrors, setPErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        (async () => {
            setIsFetchingFriends(true);
            const fRes = await getUserFriends({ userId: user._id });
            setIsFetchingFriends(false);

            setIsFetchingPeople(true);
            const pRes = await getUserPeople();
            setIsFetchingPeople(false);

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
                <FetchingOverlay
                    isFetching={isFetchingFriends}
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
                    isFetching={isFetchingPeople}
                    text="Fetching people you might know..."
                    errors={pErrors}
                >
                    <UsersSection
                        title="People you might know"
                        users={userPeople}
                        noUsersText="Wait a sec... you know everyone!"
                    />
                </FetchingOverlay>
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
    gap: 16px;
    align-items: center;

    flex-direction: column;

    padding: 16px 0;
    box-sizing: border-box;
`;

export default FriendsPage;
