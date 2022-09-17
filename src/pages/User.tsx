import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import ProfileView from '../components/ProfileView';
import getUser from '../lib/getUser';

const UserPage = () => {
    const params = useParams();
    const userQuery = useQuery(['users', params.userId], () =>
        getUser({ userId: params.userId as string }),
    );

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <FetchingOverlay
                    isFetching={userQuery.isLoading}
                    text="Loading Profile..."
                >
                    {userQuery.isSuccess && (
                        <ProfileView profileUser={userQuery.data} />
                    )}
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
    justify-content: center;

    box-sizing: border-box;
    padding: 16px 0;
`;

export default UserPage;
