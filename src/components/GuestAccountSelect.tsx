import { useEffect, useState } from 'react';
import { ImArrowRight } from 'react-icons/im';
import styled from 'styled-components';

import getGuestUsers from '../lib/getGuestUsers';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import loginGuest from '../lib/loginGuest';
import Errors from './Errors';
import FetchingOverlay from './HOCs/FetchingOverlay';

const GuestAccountSelect = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isLoggingIn, setIsLogginIn] = useState(false);
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [guestUsers, setGuestUsers] = useState<IUser[]>([]);

    const handleSubmit = async () => {
        setIsLogginIn(true);
        const res = await loginGuest({ userId: selectedUserId });
        setIsLogginIn(false);

        switch (res.state) {
            case 'success':
                location.href = location.origin;
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            const res = await getGuestUsers();
            setIsFetching(false);

            switch (res.state) {
                case 'success':
                    setGuestUsers(res.users);
                    break;
                case 'failed':
                    setErrors(res.errors);
                    break;
            }
        })();
    }, []);

    return (
        <StyledContainer>
            <FetchingOverlay isFetching={isFetching}>
                <StyledSelect
                    name="guest-users"
                    disabled={guestUsers.length === 0}
                    value={selectedUserId}
                    onChange={(e) => {
                        setSelectedUserId(e.target.value);
                    }}
                >
                    <option value="" disabled></option>
                    {guestUsers.map((u) => (
                        <option key={u._id} value={u._id}>
                            {u.displayName}
                        </option>
                    ))}
                </StyledSelect>
                <Errors errors={errors} />
            </FetchingOverlay>
            <StyledContinueButton
                disabled={selectedUserId === '' || isLoggingIn}
                onClick={handleSubmit}
            >
                <ImArrowRight fill="white" size={'18px'} />
            </StyledContinueButton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
`;

const StyledSelect = styled.select`
    background-color: transparent;
    border: 1px solid var(--primary-color);

    cursor: pointer;
`;

const StyledContinueButton = styled.button`
    background-color: var(--primary-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;

    cursor: pointer;

    &:hover {
        filter: brightness(0.98);
    }

    &:disabled {
        background-color: grey;
        cursor: default;
    }
`;

export default GuestAccountSelect;
