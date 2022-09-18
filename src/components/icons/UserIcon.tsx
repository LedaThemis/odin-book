import styled from 'styled-components';

import { useCurrentUser } from '../../context/UserProvider';
import getOverrideField from '../../lib/getOverrideField';
import { IPopulatedUser, IUser } from '../../lib/interfaces/User';

interface IUserIcon {
    user?: IUser | IPopulatedUser;
    size?: string;
    className?: string;
    onClick?: () => void;
}

const UserIcon = ({
    user = useCurrentUser() as IUser,
    size = '40px',
    className,
    onClick,
}: IUserIcon) => {
    return (
        <StyledImg
            size={size}
            className={className}
            onClick={onClick}
            src={getOverrideField(user, 'photoURL')}
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
