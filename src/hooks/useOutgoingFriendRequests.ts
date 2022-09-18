import { useQuery } from '@tanstack/react-query';

import getUserOutgoingFriendRequests from '../lib/getOutgoingFriendRequests';

const useOutgoingFriendRequests = () =>
    useQuery(['outgoing'], getUserOutgoingFriendRequests);

export default useOutgoingFriendRequests;
