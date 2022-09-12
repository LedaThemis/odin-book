import { IPost } from '../lib/interfaces/Post';
import PostManagePopupBase from './PostManagePopupBase';

interface IPostCreatePopup {
    addPostToState: (post: IPost) => void;
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreatePopup = ({
    addPostToState,
    setIsPopupShown,
}: IPostCreatePopup) => {
    return (
        <PostManagePopupBase
            title="Create Post"
            submitButtonText="Post"
            addPostToState={addPostToState}
            setIsPopupShown={setIsPopupShown}
            actionType="Create"
        />
    );
};

export default PostCreatePopup;
