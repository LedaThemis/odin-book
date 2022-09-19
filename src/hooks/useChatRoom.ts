import { useQuery } from '@tanstack/react-query';

import getChatRoom from '../lib/getChatRoom';

const useChatRoom = (roomId: string) =>
    useQuery(['chat', 'rooms', roomId], () => getChatRoom({ roomId }));

export default useChatRoom;
