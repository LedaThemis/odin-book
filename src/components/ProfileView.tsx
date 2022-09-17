import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { useUser } from '../context/UserProvider';
import areFriends from '../lib/areFriends';
import areSameUser from '../lib/areSameUser';
import canSeePosts from '../lib/canSeePosts';
import friendUser from '../lib/friendUser';
import getUserPosts from '../lib/getUserPosts';
import hasSentFriendRequest from '../lib/hasSentFriendRequest';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import { IPopulatedUser, IUser } from '../lib/interfaces/User';
import unfriendUser from '../lib/unfriendUser';
import FetchingOverlay from './HOCs/FetchingOverlay';
import PopupBase from './PopupBase';
import PostsRender from './PostsRender';
import ProfilePostsSection from './ProfilePostsSection';
import UsersSection from './UsersSection';
import AcceptOrRejectFriendRequestButton from './buttons/AcceptOrRejectFriendRequestButton';
import AddFriendButton from './buttons/AddFriendButton';
import AreFriendsButton from './buttons/AreFriendsButton';
import CancelFriendRequestButton from './buttons/CancelFriendRequestButton';
import UserIcon from './icons/UserIcon';

interface IProfileView {
    profileUser: IPopulatedUser;
}

const ProfileView = ({ profileUser }: IProfileView) => {
    const currentUser = useUser() as IUser;

    const isFriend = useMemo(
        () => canSeePosts(profileUser, currentUser),
        [profileUser, currentUser],
    );

    const queryClient = useQueryClient();

    const { isLoading, data = [] } = useQuery(
        ['users', profileUser._id, 'posts'],
        () => getUserPosts({ userId: profileUser._id }),
        {
            enabled: isFriend,
        },
    );

    const friendUserMutation = useMutation(
        () => friendUser({ userId: profileUser._id }),
        {
            onSuccess: (user) => {
                queryClient.setQueryData<IPopulatedUser>(
                    ['users', profileUser._id],
                    user,
                );

                // TODO: Update current user
            },
        },
    );
    const unfriendUserMutation = useMutation(
        () => unfriendUser({ userId: profileUser._id }),
        {
            onSuccess: (user) => {
                queryClient.setQueryData<IPopulatedUser>(
                    ['users', profileUser._id],
                    user,
                );

                // TODO: Update current user

                setIsUnfriendUserPopupShown(false);
            },
        },
    );

    const [isUnfriendUserPopupShown, setIsUnfriendUserPopupShown] =
        useState(false);

    // TODO: DELETE (HERE FOR COMPATIBILITY)
    const [userPosts, setUserPosts] = useState<IPost[]>([]);

    // TODO: DELETE (HERE FOR COMPATIBILITY)
    const errors: ErrorType[] = [];

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
                    <CancelFriendRequestButton
                        onClick={unfriendUserMutation.mutate}
                    />
                );
            } else if (hasSentFriendRequest(currentUser, profileUser)) {
                return (
                    <AcceptOrRejectFriendRequestButton
                        handleAccept={friendUserMutation.mutate}
                        handleReject={unfriendUserMutation.mutate}
                    />
                );
            } else {
                return <AddFriendButton onClick={friendUserMutation.mutate} />;
            }
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
                <StyledFriendsSectionWrapper>
                    <UsersSection title="Friends" users={profileUser.friends} />
                </StyledFriendsSectionWrapper>
                <StyledUserPostsContainer>
                    <ProfilePostsSection
                        hasPosts={data.length > 0}
                        canSeePosts={isFriend}
                    />
                    {isFriend && (
                        <FetchingOverlay
                            isFetching={isLoading}
                            text="Loading user posts..."
                        >
                            {data.length > 0 && (
                                <PostsRender
                                    posts={data}
                                    setPosts={setUserPosts}
                                />
                            )}
                        </FetchingOverlay>
                    )}
                </StyledUserPostsContainer>
            </StyledFlexRowContainer>
            {isUnfriendUserPopupShown && (
                <PopupBase
                    title={`Unfriend ${profileUser.displayName}?`}
                    content={`Are you sure you want to unfriend ${profileUser.displayName}?`}
                    submitButtonText="Confirm"
                    cancelButtonText="Cancel"
                    submitButtonFunction={unfriendUserMutation.mutate}
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
    width: 100%;
    max-width: 1250px;

    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledFlexRowContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: center;

    box-sizing: border-box;

    @media screen and (max-width: 1250px) {
        flex-direction: column;
        align-items: center;
        padding: 0 16px;
    }
`;

const StyledUserPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;

    @media screen and (max-width: 1250px) {
        max-width: 680px;
    }
`;

const StyledFriendsSectionWrapper = styled.div`
    width: 100%;
    max-width: 380px;

    @media screen and (max-width: 1250px) {
        max-width: 680px;
    }
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

    @media screen and (max-width: 1250px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledFlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media screen and (max-width: 1250px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledName = styled.h1``;

const StyledActionButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`;

export default ProfileView;
