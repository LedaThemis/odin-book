import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteComment from '../lib/deleteComment';
import { IComment } from '../lib/interfaces/Comment';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import PopupBase from './PopupBase';

interface ICommentDeletePopup {
    post: IPost;
    comment: IComment;
    hidePopup: () => void;
}

const CommentDeletePopup = ({
    post,
    comment,
    hidePopup,
}: ICommentDeletePopup) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        () => deleteComment({ postId: post._id, commentId: comment._id }),
        {
            onSuccess: (post) => {
                queryClient.setQueryData<IPost[]>(['timeline'], (old = []) =>
                    old.map((p) => (p._id === post._id ? post : p)),
                );
                hidePopup();
            },
        },
    );

    // TODO: DELETE (HERE FOR COMPATIBILITY)
    const errors: ErrorType[] = [];

    return (
        <PopupBase
            title="Delete Comment?"
            content="Are you sure you want to delete this comment?"
            submitButtonText="Delete"
            cancelButtonText="No"
            submitButtonFunction={mutation.mutate}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
            errors={errors}
        />
    );
};

export default CommentDeletePopup;
