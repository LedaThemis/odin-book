import { useEffect, useState } from 'react';
import { BsPersonCheckFill } from 'react-icons/bs';
import { MdPersonAddAlt1 } from 'react-icons/md';
import styled from 'styled-components';

import { useUser } from '../context/UserProvider';
import areFriends from '../lib/areFriends';
import areSameUser from '../lib/areSameUser';
import canSeePosts from '../lib/canSeePosts';
import getUserPosts from '../lib/getUserPosts';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import { IPopulatedUser, IUser } from '../lib/interfaces/User';
import Errors from './Errors';
import PostsRender from './PostsRender';
import ProfileFriendsSection from './ProfileFriendsSection';
import ProfilePostsSection from './ProfilePostsSection';
import UserIcon from './icons/UserIcon';

const AddFriendButton = () => {
    return (
        <StyledAddFriend
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = '';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
            }}
        >
            <MdPersonAddAlt1 size={'24px'} />
            <StyledButtonText>Add Friend</StyledButtonText>
        </StyledAddFriend>
    );
};

const AreFriendsButton = () => {
    return (
        <StyledAreFriendsButton
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = '';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
            }}
        >
            <BsPersonCheckFill size={'24px'} />
            <StyledButtonText>Friends</StyledButtonText>
        </StyledAreFriendsButton>
    );
};

interface IProfileView {
    profileUser: IPopulatedUser;
}

const ProfileView = ({ profileUser }: IProfileView) => {
    const currentUser = useUser() as IUser;
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        if (!canSeePosts(profileUser, currentUser)) return;

        (async () => {
            const res = await getUserPosts({ userId: profileUser._id });

            switch (res.state) {
                case 'success':
                    setUserPosts(res.posts);
                    break;
                case 'failed':
                    setErrors(res.errors);
                    break;
            }
        })();
    }, []);

    return (
        <StyledWrapper>
            <StyledContainer>
                <StyledProfileTopSection>
                    <UserIcon user={profileUser} size={'168px'} />
                    <StyledFlexWrapper>
                        <StyledName>{profileUser.displayName}</StyledName>
                        <StyledActionButtonsContainer>
                            {!areSameUser(profileUser, currentUser) &&
                                (areFriends(profileUser, currentUser) ? (
                                    <AreFriendsButton />
                                ) : (
                                    <AddFriendButton />
                                ))}
                        </StyledActionButtonsContainer>
                    </StyledFlexWrapper>
                </StyledProfileTopSection>
                <StyledLineContainer />
            </StyledContainer>
            <StyledFlexRowContainer>
                <ProfileFriendsSection users={profileUser.friends} />
                <StyledUserPostsContainer>
                    <ProfilePostsSection
                        hasPosts={userPosts.length > 0}
                        canSeePosts={canSeePosts(profileUser, currentUser)}
                    />
                    {canSeePosts(profileUser, currentUser) &&
                        userPosts.length > 0 && (
                            <PostsRender
                                posts={userPosts}
                                setPosts={setUserPosts}
                            />
                        )}
                    {errors.length > 0 && <Errors errors={errors} />}
                </StyledUserPostsContainer>
            </StyledFlexRowContainer>
        </StyledWrapper>
    );
};

const StyledLineContainer = styled.div`
    margin-top: 12px;
    border-top: 1px solid #eee;
`;

const StyledWrapper = styled.div`
    width: max(60%, 400px);

    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledFlexRowContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: flex-start;
`;

const StyledUserPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
`;

const StyledContainer = styled.div`
    padding: 12px 8px;
    box-sizing: border-box;
    background-color: white;

    border-radius: var(--standard-border-radius);

    box-shadow: 0 1px 2px var(--shadow-2);
`;

const StyledProfileTopSection = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 16px;

    border-radius: var(--standard-border-radius);

    background: linear-gradient(var(--background-color) 50%, transparent 50%)
        no-repeat;
`;

const StyledFlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const StyledName = styled.h1``;

const StyledActionButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledAddFriend = styled.button`
    background-color: var(--primary-color);
    color: white;
    border: none;

    border-radius: var(--standard-border-radius);

    padding: 8px 8px;
    box-sizing: border-box;

    display: flex;
    gap: 4px;
    align-items: center;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
        filter: brightness(0.97);
    }
`;

const StyledAreFriendsButton = styled.div`
    background-color: var(--background-color);
    color: black;
    border: none;

    border-radius: var(--standard-border-radius);

    padding: 8px 12px;
    box-sizing: border-box;

    display: flex;
    gap: 4px;
    align-items: center;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
        filter: brightness(0.97);
    }
`;

const StyledButtonText = styled.p`
    margin: 0;
`;

export default ProfileView;
