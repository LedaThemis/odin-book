import axios from './axiosInstance';
import { IChatRoom } from './interfaces/ChatRoom';
import { InData } from './interfaces/Response';

interface IStartConversation {
    userId: string;
}

interface IStartConversationResponse {
    state: 'success';
    room: IChatRoom;
}

const startConversation = async ({
    userId,
}: IStartConversation): Promise<IChatRoom> => {
    const { data }: InData<IStartConversationResponse> = await axios.post(
        'chat/conversations',
        { userId },
    );

    return data.room;
};

export default startConversation;
