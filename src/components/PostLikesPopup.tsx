import usePostLikes from '../hooks/usePostLikes';
import FetchingOverlay from './HOCs/FetchingOverlay';
import UsersSection from './UsersSection';
import PopupBase from './bases/PopupBase';

interface PostLikesPopupProps {
    postId: string;
    hidePopup: () => void;
}

const PostLikesPopup = ({ postId, hidePopup }: PostLikesPopupProps) => {
    const postLikesQuery = usePostLikes(postId);

    return (
        <PopupBase
            withButtons={false}
            title="Likes"
            Component={
                <FetchingOverlay isFetching={postLikesQuery.isLoading}>
                    {postLikesQuery.isSuccess && (
                        <UsersSection
                            title=""
                            users={postLikesQuery.data}
                            noUsersText="This should be impossible"
                        />
                    )}
                </FetchingOverlay>
            }
            hidePopup={hidePopup}
        />
    );
};

export default PostLikesPopup;
