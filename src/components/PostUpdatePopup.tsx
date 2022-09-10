import { IPost } from '../lib/interfaces/Post';
import PostManagePopupBase from './PostManagePopupBase';

interface IPostUpdatePopup {
    originalPost: IPost;
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostUpdatePopup = ({
    originalPost,
    setIsPopupShown,
}: IPostUpdatePopup) => {
    return (
        <PostManagePopupBase
            title="Edit Post"
            submitButtonText="Save"
            setIsPopupShown={setIsPopupShown}
            actionType="Update"
            originalPost={originalPost}
        />
    );
};

export default PostUpdatePopup;
