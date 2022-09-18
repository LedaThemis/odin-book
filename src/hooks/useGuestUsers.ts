import { useQuery } from '@tanstack/react-query';

import getGuestUsers from '../lib/getGuestUsers';

const useGuestUsers = () => useQuery(['users', 'guest'], getGuestUsers);

export default useGuestUsers;
