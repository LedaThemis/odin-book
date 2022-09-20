import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IPost } from '../lib/interfaces/Post';
import updatePost from '../lib/updatePost';
import PostManagePopupBase from './bases/PostManagePopupBase';

interface PostUpdatePopupProps {
    originalPost: IPost;
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostUpdatePopup = ({
    originalPost,
    setIsPopupShown,
}: PostUpdatePopupProps) => {
    const queryClient = useQueryClient();
    const updatePostMutation = useMutation(
        ({ content, photos }: { content: string; photos: string[] }) =>
            updatePost({
                postId: originalPost._id,
                content,
                photos,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['timeline']);
                // Hide popup
                setIsPopupShown(false);
            },
        },
    );

    return (
        <PostManagePopupBase
            title="Edit Post"
            submitButtonText="Save"
            setIsPopupShown={setIsPopupShown}
            originalPost={originalPost}
            mutation={updatePostMutation}
        />
    );
};

export default PostUpdatePopup;
