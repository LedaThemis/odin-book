import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useSetUser, useUser } from '../context/UserProvider';
import areFriends from '../lib/areFriends';
import areSameUser from '../lib/areSameUser';
import canSeePosts from '../lib/canSeePosts';
import friendUser from '../lib/friendUser';
import getCurrentUser from '../lib/getCurrentUser';
import getUserPosts from '../lib/getUserPosts';
import hasSentFriendRequest from '../lib/hasSentFriendRequest';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import { IPopulatedUser, IUser } from '../lib/interfaces/User';
import unfriendUser from '../lib/unfriendUser';
import Errors from './Errors';
import PopupBase from './PopupBase';
import PostsRender from './PostsRender';
import ProfileFriendsSection from './ProfileFriendsSection';
import ProfilePostsSection from './ProfilePostsSection';
import AcceptOrRejectFriendRequestButton from './buttons/AcceptOrRejectFriendRequestButton';
import AddFriendButton from './buttons/AddFriendButton';
import AreFriendsButton from './buttons/AreFriendsButton';
import CancelFriendRequestButton from './buttons/CancelFriendRequestButton';
import UserIcon from './icons/UserIcon';

interface IProfileView {
    profileUser: IPopulatedUser;
    setProfileUser: React.Dispatch<
        React.SetStateAction<IPopulatedUser | undefined>
    >;
}

const ProfileView = ({ profileUser, setProfileUser }: IProfileView) => {
    const currentUser = useUser() as IUser;
    const setCurrentUser = useSetUser();
    const [isUnfriendUserPopupShown, setIsUnfriendUserPopupShown] =
        useState(false);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleFriend = async (op: 'Add' | 'Remove') => {
        const fn = op === 'Add' ? friendUser : unfriendUser;

        const res = await fn({ userId: profileUser._id });
        const userRes = await getCurrentUser();

        switch (res.state) {
            case 'success':
                setProfileUser(res.user);
                setCurrentUser({
                    user: userRes.user,
                });
                setIsUnfriendUserPopupShown(false);
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    const handleAddFriend = async () => {
        await handleFriend('Add');
    };

    const handleRemoveFriend = async () => {
        await handleFriend('Remove');
    };

    const ActionButton = () =>
        useMemo(() => {
            if (areFriends(profileUser, currentUser)) {
                return (
                    <AreFriendsButton
                        onClick={() => {
                            setIsUnfriendUserPopupShown(
                                (prevState) => !prevState,
                            );
                        }}
                    />
                );
            } else if (hasSentFriendRequest(profileUser, currentUser)) {
                return (
                    <CancelFriendRequestButton onClick={handleRemoveFriend} />
                );
            } else if (hasSentFriendRequest(currentUser, profileUser)) {
                return (
                    <AcceptOrRejectFriendRequestButton
                        handleAccept={handleAddFriend}
                        handleReject={handleRemoveFriend}
                    />
                );
            } else {
                return <AddFriendButton onClick={handleAddFriend} />;
            }
        }, [profileUser, currentUser]);

    useEffect(() => {
        if (!canSeePosts(profileUser, currentUser)) return;

        (async () => {
            const res = await getUserPosts({ userId: profileUser._id });

            switch (res.state) {
                case 'success':
                    setUserPosts(res.posts);
                    setErrors([]);
                    break;
                case 'failed':
                    setUserPosts([]);
                    setErrors(res.errors);
                    break;
            }
        })();
    }, [profileUser, currentUser]);

    return (
        <StyledWrapper>
            <StyledContainer>
                <StyledProfileTopSection>
                    <UserIcon user={profileUser} size={'168px'} />
                    <StyledFlexWrapper>
                        <StyledName>{profileUser.displayName}</StyledName>
                        <StyledActionButtonsContainer>
                            {!areSameUser(profileUser, currentUser) && (
                                <ActionButton />
                            )}
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
                    {errors.length > 0 && <Errors errors={errors} />}
                    {canSeePosts(profileUser, currentUser) &&
                        userPosts.length > 0 && (
                            <PostsRender
                                posts={userPosts}
                                setPosts={setUserPosts}
                            />
                        )}
                </StyledUserPostsContainer>
            </StyledFlexRowContainer>
            {isUnfriendUserPopupShown && (
                <PopupBase
                    title={`Unfriend ${profileUser.displayName}?`}
                    content={`Are you sure you want to unfriend ${profileUser.displayName}?`}
                    submitButtonText="Confirm"
                    cancelButtonText="Cancel"
                    submitButtonFunction={handleRemoveFriend}
                    cancelButtonFunction={() => {
                        setIsUnfriendUserPopupShown(false);
                    }}
                    hidePopup={() => {
                        setIsUnfriendUserPopupShown(false);
                    }}
                    errors={errors}
                />
            )}
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

export default ProfileView;
