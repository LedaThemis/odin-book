import styled from 'styled-components';

import { useUser } from '../../context/UserProvider';
import { IUser } from '../../lib/interfaces/User';

interface IUserIcon {
    user?: IUser;
    size?: string;
    className?: string;
    onClick?: () => void;
}

const UserIcon = ({ user, size, className, onClick }: IUserIcon) => {
    let selectedUser: IUser;
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
            className={className}
            onClick={onClick}
            src={selectedUser.photoURL}
            referrerPolicy="no-referrer"
            style={{ width: selectedSize, height: selectedSize }}
        />
    );
};

const StyledImg = styled.img`
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
`;

export default UserIcon;
