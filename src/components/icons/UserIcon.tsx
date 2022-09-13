import styled from 'styled-components';

import { useUser } from '../../context/UserProvider';
import getOverrideField from '../../lib/getOverrideField';
import { IPopulatedUser, IUser } from '../../lib/interfaces/User';

interface IUserIcon {
    user?: IUser | IPopulatedUser;
    size?: string;
    className?: string;
    onClick?: () => void;
}

const UserIcon = ({ user, size, className, onClick }: IUserIcon) => {
    let selectedUser: IUser | IPopulatedUser;
    let selectedSize: string;

    if (user) {
        selectedUser = user;
    } else {
        selectedUser = useUser() as IUser;
    }

    if (size) {
        selectedSize = size;
    } else {
        selectedSize = '40px';
    }

    return (
        <StyledImg
            size={selectedSize}
            className={className}
            onClick={onClick}
            src={getOverrideField(selectedUser, 'photoURL')}
            referrerPolicy="no-referrer"
        />
    );
};

const StyledImg = styled.img<{ size: string }>`
    object-fit: cover;
    background-color: var(--background-color);

    width: ${(props) => props.size};
    height: ${(props) => props.size};
    flex-shrink: 0;

    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;

    cursor: pointer;
`;

export default UserIcon;
