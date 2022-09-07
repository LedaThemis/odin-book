import { HiCog } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';
import styled from 'styled-components';

import { useAuth } from '../context/AuthProvider';
import MenuBar from './MenuBar';
import UserBar from './UserBar';

const UserMenu = ({ className }: { className?: string }) => {
    const auth = useAuth();

    return (
        <StyledUserMenu className={className}>
            <UserBar />
            <MenuBar text="Settings" Icon={HiCog} destination="/settings" />
            <MenuBar text="Log Out" Icon={ImExit} onClick={auth.logout} />
        </StyledUserMenu>
    );
};

const StyledUserMenu = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    right: 16px;
    width: 360px;
    max-height: 380px;
    position: absolute;
    box-shadow: var(--card-box-shadow);
    overflow-y: scroll;
    border-radius: 10px;

    box-sizing: border-box;
    padding: 6px 12px;
`;

export default UserMenu;
