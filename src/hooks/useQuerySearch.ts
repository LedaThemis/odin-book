import { useQuery } from '@tanstack/react-query';

import queryUsers from '../lib/queryUsers';

const useUsersSearchQuery = (query: string | null) => {
    const q = query ? query : '';

    const usersSearchQuery = useQuery(
        ['users', 'search', { q }],
        () => queryUsers({ q }),
        {
            enabled: q.length > 0,
        },
    );

    return usersSearchQuery;
};

export default useUsersSearchQuery;
