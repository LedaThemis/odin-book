import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { useCurrentUser } from '../context/UserProvider';
import getOverrideField from '../lib/getOverrideField';
import hasCustomField from '../lib/hasCustomField';
import { IUser } from '../lib/interfaces/User';
import updateUser from '../lib/updateUser';
import SectionBase from './bases/SectionBase';

const UserUpdateSection = () => {
    const user = useCurrentUser() as IUser;

    const queryClient = useQueryClient();
    const userMutation = useMutation(() => updateUser({ photoURL }), {
        onSuccess: (user) => {
            queryClient.setQueryData<IUser>(['me'], user);
            toast.success('Successfully updated avatar!');
        },
    });

    const [photoURL, setPhotoURL] = useState(
        hasCustomField(user, 'photoURL') ? user.custom.photoURL : '',
    );

    const handleSubmit = () => {
        userMutation.mutate();
    };

    return (
        <SectionBase title="Update User">
            <StyledInput
                value={photoURL}
                onChange={(e) => {
                    setPhotoURL(e.target.value);
                }}
                type="text"
                placeholder="Custom Avatar URL"
            />
            <StyledSubmitButton
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.978632)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                }}
                onClick={handleSubmit}
                disabled={
                    userMutation.isLoading ||
                    getOverrideField(user, 'photoURL') === photoURL
                }
            >
                Update
            </StyledSubmitButton>
            <StyledInfo>
                Set to an empty string to use your Google account avatar.
            </StyledInfo>
        </SectionBase>
    );
};

const StyledInput = styled.input`
    border: none;
    font-family: inherit;
    font-size: 18px;
    width: 100%;

    box-sizing: border-box;
    padding: 8px;
    border-radius: 8px;

    box-shadow: 0 1px 2px var(--shadow-2);

    &:focus {
        outline: none;
    }
`;

const StyledSubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    font-family: inherit;

    border-radius: 6px;

    padding: 8px 0;

    background-color: var(--primary-button-color);
    color: white;

    &:disabled {
        background-color: var(--disabled-button-background-color);
        color: var(--disabled-button-text-color);
    }

    cursor: pointer;

    border: none;
`;

const StyledInfo = styled.p`
    margin: 0;
`;

export default UserUpdateSection;
