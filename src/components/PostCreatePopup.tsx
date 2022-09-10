import PostManagePopupBase from './PostManagePopupBase';

interface IPostCreatePopup {
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreatePopup = ({ setIsPopupShown }: IPostCreatePopup) => {
    return (
        <PostManagePopupBase
            title="Create Post"
            submitButtonText="Post"
            setIsPopupShown={setIsPopupShown}
            actionType="Create"
        />
    );
};

export default PostCreatePopup;
