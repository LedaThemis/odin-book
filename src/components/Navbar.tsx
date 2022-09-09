import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import FacebookIcon from './icons/FacebookIcon';
import FriendsIcon from './icons/FriendsIcon';
import HomeIcon from './icons/HomeIcon';
import UserIcon from './icons/UserIcon';

const getIsSelected = (key: string) =>
    key.replaceAll('/', '') === location.pathname.replaceAll('/', '');

const Navbar = () => {
    const [userMenuShown, setUserMenuShown] = useState(false);

    return (
        <StyledNavbar>
            <StyledMetaList>
                <StyledList>
                    <li>
                        <Link to="/">
                            <FacebookIcon />
                        </Link>
                    </li>
                    <li style={{ alignSelf: 'center' }}>
                        <SearchBar />
                    </li>
                </StyledList>
                <StyledMiddleList>
                    <li>
                        <Link to="/">
                            <StyledNavbarIcon isSelected={getIsSelected('/')}>
                                <HomeIcon filled={getIsSelected('/')} />
                            </StyledNavbarIcon>
                        </Link>
                    </li>
                    <li>
                        <Link to="/friends">
                            <StyledNavbarIcon
                                isSelected={getIsSelected('/friends')}
                            >
                                <FriendsIcon
                                    filled={getIsSelected('/friends')}
                                />
                            </StyledNavbarIcon>
                        </Link>
                    </li>
                </StyledMiddleList>
                <StyledList>
                    <li>
                        <UserIcon
                            onClick={() =>
                                setUserMenuShown((prevState) => !prevState)
                            }
                        />
                        {userMenuShown && <StyledUserMenu />}
                    </li>
                </StyledList>
            </StyledMetaList>
        </StyledNavbar>
    );
};

const StyledNavbar = styled.div`
    height: fit-content;
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: flex-end;
    gap: 10px;
`;

const StyledMetaList = styled(StyledList)`
    justify-content: space-between;
    padding: 4px 16px;
`;

const StyledMiddleList = styled(StyledList)`
    width: 50%;
    justify-content: center;
    position: absolute;
    margin: 0 25%;
`;

const StyledNavbarIcon = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    // This is 54px (height of navbar in facebook) - 2*4px (padding-top and padding-bottom of 4px from parent container)
    height: 46px;

    // border-bottom paired with margin-bottom of negative to negate the effect of border
    border-bottom: ${(props) =>
        props.isSelected ? '4px solid var(--primary-color)' : ''};
    margin-bottom: ${(props) => (props.isSelected ? '-4px' : '')};

    &:hover {
        background-color: ${(props) =>
            !props.isSelected ? 'rgba(141, 141, 141, 0.178)' : ''};
        border-radius: ${(props) => (!props.isSelected ? '10px' : '0px')};
    }
`;

const StyledUserMenu = styled(UserMenu)``;

export default Navbar;
