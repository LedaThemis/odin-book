import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Errors from '../components/Errors';
import Navbar from '../components/Navbar';
import ProfileView from '../components/ProfileView';
import getUser from '../lib/getUser';
import handleError from '../lib/handleError';
import { ErrorType } from '../lib/interfaces/Error';
import { IPopulatedUser } from '../lib/interfaces/User';

const UserPage = () => {
    const params = useParams();
    const [profileUser, setProfileUser] = useState<IPopulatedUser>();
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        (async () => {
            if (!params.userId) {
                setErrors(handleError('User ID is not recognized.').errors);
                return;
            }

            const res = await getUser({ userId: params.userId });

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
    }, []);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                {profileUser && <ProfileView profileUser={profileUser} />}
                {errors.length > 0 && <Errors errors={errors} />}
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
