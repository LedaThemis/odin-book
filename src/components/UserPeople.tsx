import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import usePeopleYouMightKnow from '../hooks/usePeopleYouMightKnow';
import FetchingOverlay from './HOCs/FetchingOverlay';
import UsersSection from './UsersSection';

const UserPeople = () => {
    const userPeopleQuery = usePeopleYouMightKnow();

    const [ref, inView] = useInView();

    const people = useMemo(
        () =>
            userPeopleQuery.isSuccess
                ? userPeopleQuery.data.pages
                      .flat()
                      .map((v) => v.users)
                      .flat()
                : [],
        [userPeopleQuery.data],
    );

    useEffect(() => {
        if (inView) {
            userPeopleQuery.fetchNextPage();
        }
    }, [inView]);

    return (
        <StyledContainer>
            <FetchingOverlay
                isFetching={userPeopleQuery.isLoading}
                text="Fetching people you might know..."
            >
                {userPeopleQuery.isSuccess && (
                    <UsersSection
                        title="People you might know"
                        users={people}
                        noUsersText="Wait a sec... you know everyone!"
                    />
                )}
            </FetchingOverlay>
            <StyledButton
                onClick={() => userPeopleQuery.fetchNextPage()}
                ref={ref}
                disabled={
                    !userPeopleQuery.hasNextPage ||
                    userPeopleQuery.isFetchingNextPage
                }
            >
                {userPeopleQuery.isFetchingNextPage
                    ? 'Loading more...'
                    : userPeopleQuery.hasNextPage
                    ? 'Load more'
                    : 'Nothing more to load'}
            </StyledButton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

const StyledButton = styled.button`
    cursor: pointer;
`;

export default UserPeople;
