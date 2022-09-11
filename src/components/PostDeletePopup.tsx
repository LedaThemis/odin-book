import { useState } from 'react';

import { useManagePost } from '../context/ManagePostProvider';
import deletePost from '../lib/deletePost';
import { ErrorType } from '../lib/interfaces/Error';
import { IPost } from '../lib/interfaces/Post';
import PopupBase from './PopupBase';

interface IPostDeletePopup {
    post: IPost;
    hidePopup: () => void;
}

const PostDeletePopup = ({ post, hidePopup }: IPostDeletePopup) => {
    const { deletePostFromState } = useManagePost();

    const [errors, setErrors] = useState<ErrorType[]>([]);

    const handleDelete = async () => {
        const res = await deletePost({ postId: post._id });

        switch (res.state) {
            case 'success':
                deletePostFromState();
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
            title="Move to your trash?"
            content="Items in your trash will be deleted immediately."
            submitButtonText="Move"
            cancelButtonText="Cancel"
            submitButtonFunction={handleDelete}
            cancelButtonFunction={hidePopup}
            hidePopup={hidePopup}
            errors={errors}
        />
    );
};

export default PostDeletePopup;
