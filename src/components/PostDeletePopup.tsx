import { useMutation, useQueryClient } from '@tanstack/react-query';

import deletePost from '../lib/deletePost';
import { IPost } from '../lib/interfaces/Post';
import PopupBase from './buttons/PopupBase';

interface PostDeletePopupProps {
    post: IPost;
    hidePopup: () => void;
}

const PostDeletePopup = ({ post, hidePopup }: PostDeletePopupProps) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => deletePost({ postId: post._id }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['timeline']);
            hidePopup();
        },
    });

    return (
        <PopupBase
            title="Move to your trash?"
            content="Items in your trash will be deleted immediately."
            submitButtonText="Move"
            cancelButtonText="Cancel"
            submitButtonFunction={mutation.mutate}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
        />
    );
};

export default PostDeletePopup;
