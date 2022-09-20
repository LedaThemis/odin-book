import { useMutation, useQueryClient } from '@tanstack/react-query';

import createPost from '../lib/createPost';
import PostManagePopupBase from './bases/PostManagePopupBase';

interface PostCreatePopupProps {
    setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreatePopup = ({ setIsPopupShown }: PostCreatePopupProps) => {
    const queryClient = useQueryClient();
    const createPostMutation = useMutation(
        ['post', 'create'],
        ({ content, photos }: { content: string; photos: string[] }) =>
            createPost({ content, photos }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['timeline']);
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
