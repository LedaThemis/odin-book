import { useQuery } from '@tanstack/react-query';

import getConversations from '../lib/getConversations';

const useConversations = () =>
    useQuery(['chat', 'conversations'], getConversations);

export default useConversations;
