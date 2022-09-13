import { useState } from 'react';
import styled from 'styled-components';

import { useSetUser, useUser } from '../context/UserProvider';
import getOverrideField from '../lib/getOverrideField';
import hasCustomField from '../lib/hasCustomField';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import updateUser from '../lib/updateUser';
import Errors from './Errors';
import SectionBase from './SectionBase';

const UserUpdateSection = () => {
    const user = useUser() as IUser;
    const setUser = useSetUser();

    const [statusText, setStatusText] = useState('');
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [photoURL, setPhotoURL] = useState(
        hasCustomField(user, 'photoURL') ? user.custom.photoURL : '',
    );
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitDisabled(true);
        const res = await updateUser({ photoURL });
        setIsSubmitDisabled(false);

        switch (res.state) {
            case 'success':
                setErrors([]);
                setStatusText('Successfully updated avatar!');
                setUser({
                    user: res.user,
                });
                break;
            case 'failed':
                setStatusText('');
                setErrors(res.errors);
                break;
        }
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
                    isSubmitDisabled ||
                    getOverrideField(user, 'photoURL') === photoURL
                }
            >
                Update
            </StyledSubmitButton>
            <StyledInfo>
                Set to an empty string to use your Google account avatar.
            </StyledInfo>
            {statusText && <StyledStatusText>{statusText}</StyledStatusText>}
            <Errors errors={errors} />
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

const StyledStatusText = styled.p`
    margin: 2px 0;
    color: green;
    text-align: center;
`;

export default UserUpdateSection;
