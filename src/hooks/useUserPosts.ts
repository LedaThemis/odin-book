import { useQuery } from '@tanstack/react-query';

import getUserPosts from '../lib/getUserPosts';

const useUserPosts = (userId: string, isFriend: boolean) =>
    useQuery(['users', userId, 'posts'], () => getUserPosts({ userId }), {
        enabled: isFriend,
    });

export default useUserPosts;
