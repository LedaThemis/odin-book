import { useQuery } from '@tanstack/react-query';

import getUserIncomingFriendRequests from '../lib/getUserIncomingFriendRequests';

const useIncomingFriendRequests = () =>
    useQuery(['incoming'], getUserIncomingFriendRequests);

export default useIncomingFriendRequests;
