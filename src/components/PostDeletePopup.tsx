import { useMutation, useQueryClient } from '@tanstack/react-query';

import deletePost from '../lib/deletePost';
import { IPost } from '../lib/interfaces/Post';
import PopupBase from './PopupBase';

interface IPostDeletePopup {
    post: IPost;
    hidePopup: () => void;
}

const PostDeletePopup = ({ post, hidePopup }: IPostDeletePopup) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => deletePost({ postId: post._id }), {
        onSuccess: (postId) => {
            queryClient.setQueryData<IPost[]>(['timeline'], (old) =>
                old?.filter((p) => p._id !== postId),
            );
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
