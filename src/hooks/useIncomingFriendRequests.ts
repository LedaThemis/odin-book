import { useQuery } from '@tanstack/react-query';

import getUserIncomingFriendRequests from '../lib/getIncomingFriendRequests';

const useIncomingFriendRequests = () =>
    useQuery(['incoming'], getUserIncomingFriendRequests);

export default useIncomingFriendRequests;
