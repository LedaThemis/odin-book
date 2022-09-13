import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import ProfileView from '../components/ProfileView';
import getUser from '../lib/getUser';
import handleError from '../lib/handleError';
import { ErrorType } from '../lib/interfaces/Error';
import { IPopulatedUser } from '../lib/interfaces/User';

const UserPage = () => {
    const params = useParams();
    const [isFetching, setIsFetching] = useState(false);
    const [profileUser, setProfileUser] = useState<IPopulatedUser>();
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        (async () => {
            if (!params.userId) {
                setErrors(handleError('User ID is not recognized.').errors);
                return;
            }
            setIsFetching(true);
            const res = await getUser({ userId: params.userId });
            setIsFetching(false);

            switch (res.state) {
                case 'success':
                    setErrors([]);
                    setProfileUser(res.user);
                    break;

                case 'failed':
                    setProfileUser(undefined);
                    setErrors(res.errors);
                    break;
            }
        })();
    }, [params.userId]);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <FetchingOverlay
                    isFetching={isFetching}
                    text="Loading Profile..."
                    errors={errors}
                >
                    {profileUser && (
                        <ProfileView
                            profileUser={profileUser}
                            setProfileUser={setProfileUser}
                        />
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
