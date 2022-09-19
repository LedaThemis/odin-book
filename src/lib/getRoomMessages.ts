import axios from './axiosInstance';
import { IMessage } from './interfaces/Message';
import { InData } from './interfaces/Response';

interface IGetRoomMessages {
    roomId: string;
}

interface IGetRoomMessagesResponse {
    state: 'success';
    messages: IMessage[];
}

const getRoomMessages = async ({ roomId }: IGetRoomMessages) => {
    const { data }: InData<IGetRoomMessagesResponse> = await axios.get(
        `chat/rooms/${roomId}/messages`,
    );

    return data.messages;
};

export default getRoomMessages;
