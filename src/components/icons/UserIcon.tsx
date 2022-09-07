import styled from 'styled-components';

import { useUser } from '../../context/UserProvider';

interface IUserIcon {
    className?: string;
    onClick?: () => void;
}

const UserIcon = ({ className, onClick }: IUserIcon) => {
    const user = useUser();

    return (
        <StyledImg
            className={className}
            onClick={onClick}
            src={user?.photoURL}
            referrerPolicy="no-referrer"
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
