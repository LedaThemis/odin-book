import { useMutation, useQueryClient } from '@tanstack/react-query';

import deletePost from '../lib/deletePost';
import { ErrorType } from '../lib/interfaces/Error';
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

    // TODO: DELETE (HERE FOR COMPATIBILITY)
    const errors: ErrorType[] = [];

    return (
        <PopupBase
            title="Move to your trash?"
            content="Items in your trash will be deleted immediately."
            submitButtonText="Move"
            cancelButtonText="Cancel"
            submitButtonFunction={mutation.mutate}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
            errors={errors}
        />
    );
};

export default PostDeletePopup;
