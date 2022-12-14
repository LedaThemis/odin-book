import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import FacebookIcon from './icons/FacebookIcon';
import FriendsIcon from './icons/FriendsIcon';
import HomeIcon from './icons/HomeIcon';
import MessagesIcon from './icons/MessagesIcon';
import UserIcon from './icons/UserIcon';

const getIsSelected = (key: string) =>
    key.replaceAll('/', '') === location.pathname.replaceAll('/', '');

const Navbar = () => {
    const [userMenuShown, setUserMenuShown] = useState(false);

    return (
        <StyledNavbar>
            <StyledMetaList>
                <StyledLeftList>
                    <li>
                        <Link to="/">
                            <FacebookIcon />
                        </Link>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                </StyledLeftList>
                <StyledMiddleListContainer>
                    <StyledList>
                        <li>
                            <Link to="/">
                                <StyledNavbarIcon
                                    isSelected={getIsSelected('/')}
                                >
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
                    </StyledList>
                </StyledMiddleListContainer>
                <StyledRightList>
                    <li>
                        <Link to="/messages">
                            <StyledNavbarRightIcon
                                isSelected={getIsSelected('/messages')}
                            >
                                <MessagesIcon
                                    filled={getIsSelected('/messages')}
                                />
                            </StyledNavbarRightIcon>
                        </Link>
                    </li>
                    <li>
                        <UserIcon
                            alt="Profile Avatar"
                            onClick={() =>
                                setUserMenuShown((prevState) => !prevState)
                            }
                        />
                        {userMenuShown && <StyledUserMenu />}
                    </li>
                </StyledRightList>
            </StyledMetaList>
        </StyledNavbar>
    );
};

const StyledNavbar = styled.div`
    height: fit-content;
    background-color: var(--secondary-background-color);
    box-shadow: var(--navbar-box-shadow);

    border-bottom: 1px solid var(--section-separator-background-color);
    z-index: 1;
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: flex-end;
    gap: 10px;

    @media screen and (max-width: 600px) {
        gap: 4px;
    }
`;

const StyledHighZIndexList = styled(StyledList)`
    z-index: 1;
`;

const StyledMetaList = styled(StyledList)`
    justify-content: space-between;
    padding: 4px 16px;

    @media screen and (max-width: 600px) {
        padding-left: 1px;
        padding-right: 1px;
    }
`;

const StyledLeftList = styled(StyledHighZIndexList)`
    align-items: center;
`;

const StyledMiddleListContainer = styled.div`
    display: flex;
    width: 100%;
    left: 0;
    justify-content: center;
    position: absolute;
`;

const StyledRightList = styled(StyledHighZIndexList)`
    align-items: center;
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

    @media screen and (max-width: 600px) {
        width: 70px;
    }

    @media screen and (max-width: 400px) {
        width: 20px;
    }
`;

const StyledNavbarRightIcon = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${(props) =>
        props.isSelected
            ? 'var(--secondary-highlight-background-color)'
            : 'var(--secondary-button-background-color)'};

    padding: 10px;

    border-radius: 50%;

    &:hover {
        filter: brightness(0.98);
    }
`;

const StyledUserMenu = styled(UserMenu)`
    @media screen and (max-width: 400px) {
        width: 250px;
    }
`;

export default Navbar;
