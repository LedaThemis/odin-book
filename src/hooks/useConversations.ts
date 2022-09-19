import { useQuery } from '@tanstack/react-query';

import getConversations from '../lib/getConversations';

const useConversations = () =>
    useQuery(['messages', 'conversations'], getConversations);

export default useConversations;
