import { useQuery } from '@tanstack/react-query';

import getPostLikes from '../lib/getPostLikes';

const usePostLikes = (postId: string) =>
    useQuery(['posts', postId, 'likes'], () => getPostLikes({ postId }));

export default usePostLikes;
