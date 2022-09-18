import { useQuery } from '@tanstack/react-query';

import getUser from '../lib/getUser';

const useUser = (userId: string) =>
    useQuery(['users', userId], () => getUser({ userId }));

export default useUser;
