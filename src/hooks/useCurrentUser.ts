import { useQuery } from '@tanstack/react-query';

import getCurrentUser from '../lib/getCurrentUser';

const useCurrentUser = () => useQuery(['me'], getCurrentUser);

export default useCurrentUser;
