import { useInfiniteQuery } from '@tanstack/react-query';

import getTimeline from '../lib/getTimeline';

const useTimeline = () =>
    useInfiniteQuery(['timeline'], getTimeline, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

export default useTimeline;
