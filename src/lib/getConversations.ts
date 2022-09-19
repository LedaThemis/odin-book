import axios from './axiosInstance';
import { IChatRoom } from './interfaces/ChatRoom';
import { InData } from './interfaces/Response';

interface IGetConversationsResponse {
    state: 'success';
    conversations: IChatRoom[];
}

const getConversations = async (): Promise<IChatRoom[]> => {
    const { data }: InData<IGetConversationsResponse> = await axios.get(
        'chat/conversations',
    );

    return data.conversations;
};

export default getConversations;
