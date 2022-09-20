import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ImArrowRight } from 'react-icons/im';
import styled from 'styled-components';

import useGuestUsers from '../hooks/useGuestUsers';
import loginGuest from '../lib/loginGuest';
import FetchingOverlay from './HOCs/FetchingOverlay';

const GuestAccountSelect = () => {
    const { isLoading, data = [] } = useGuestUsers();
    const guestLoginMutation = useMutation(
        () => loginGuest({ userId: selectedUserId }),
        {
            onSuccess: () => {
                location.href = location.origin;
            },
        },
    );

    const [selectedUserId, setSelectedUserId] = useState('');

    const handleSubmit = () => {
        guestLoginMutation.mutate();
    };

    return (
        <StyledContainer>
            <FetchingOverlay isFetching={isLoading}>
                <StyledSelect
                    name="guest-users"
                    disabled={data.length === 0}
                    value={selectedUserId}
                    onChange={(e) => {
                        setSelectedUserId(e.target.value);
                    }}
                >
                    <option value="" disabled></option>
                    {data.map((u) => (
                        <option key={u._id} value={u._id}>
                            {u.displayName}
                        </option>
                    ))}
                </StyledSelect>
            </FetchingOverlay>
            <StyledContinueButton
                disabled={selectedUserId === '' || guestLoginMutation.isLoading}
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
        background-color: var(--disabled-background-color);
        cursor: default;
    }
`;

export default GuestAccountSelect;
