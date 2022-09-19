import { useInfiniteQuery } from '@tanstack/react-query';

import getUserPeople from '../lib/getUserPeople';

const usePeopleYouMightKnow = () =>
    useInfiniteQuery(['people'], getUserPeople, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

export default usePeopleYouMightKnow;
