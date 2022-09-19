import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteComment from '../lib/deleteComment';
import { IComment } from '../lib/interfaces/Comment';
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
            onSuccess: () => {
                queryClient.invalidateQueries(['timeline']);
                hidePopup();
            },
        },
    );

    return (
        <PopupBase
            title="Delete Comment?"
            content="Are you sure you want to delete this comment?"
            submitButtonText="Delete"
            cancelButtonText="No"
            submitButtonFunction={mutation.mutate}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
        />
    );
};

export default CommentDeletePopup;
