import { useQuery } from '@tanstack/react-query';

import getUserFriends from '../lib/getUserFriends';

const useUserFriends = (userId: string) =>
    useQuery(['users', userId, 'friends'], () => getUserFriends({ userId }));

export default useUserFriends;
