import { useMutation, useQueryClient } from '@tanstack/react-query';

import createPost from '../lib/createPost';
import { IPost } from '../lib/interfaces/Post';
import PostManagePopupBase from './PostManagePopupBase';

interface IPostCreatePopup {
    addPostToState: (post: IPost) => void;
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreatePopup = ({ setIsPopupShown }: IPostCreatePopup) => {
    const queryClient = useQueryClient();
    const createPostMutation = useMutation(
        ['post', 'create'],
        ({ content, photos }: { content: string; photos: string[] }) =>
            createPost({ content, photos }),
        {
            onSuccess: (post) => {
                // Push new post to timeline posts state
                queryClient.setQueryData<IPost[]>(['timeline'], (old = []) =>
                    [post].concat(old),
                );
                // Hide popup
                setIsPopupShown(false);
            },
        },
    );

    return (
        <PostManagePopupBase
            title="Create Post"
            submitButtonText="Post"
            setIsPopupShown={setIsPopupShown}
            mutation={createPostMutation}
        />
    );
};

export default PostCreatePopup;
