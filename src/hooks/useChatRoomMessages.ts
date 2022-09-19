import { useQuery } from '@tanstack/react-query';

import getRoomMessages from '../lib/getRoomMessages';

const useChatRoomMessages = (roomId: string) =>
    useQuery(['chat', 'rooms', roomId, 'messages'], () =>
        getRoomMessages({ roomId }),
    );

export default useChatRoomMessages;
