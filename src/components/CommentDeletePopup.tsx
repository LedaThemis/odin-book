import { useState } from 'react';

import { useManagePost } from '../context/ManagePostProvider';
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
    const { updatePostInState } = useManagePost();

    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleDelete = async () => {
        const res = await deleteComment({
            postId: post._id,
            commentId: comment._id,
        });

        switch (res.state) {
            case 'success':
                updatePostInState(res.post);
                setErrors([]);
                hidePopup();
                break;

            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    return (
        <PopupBase
            title="Delete Comment?"
            content="Are you sure you want to delete this comment?"
            submitButtonText="Delete"
            cancelButtonText="No"
            submitButtonFunction={handleDelete}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
            errors={errors}
        />
    );
};

export default CommentDeletePopup;
