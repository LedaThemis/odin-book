import axios from './axiosInstance';
import { InData } from './interfaces/Response';

interface IDeleteRoomMessage {
    roomId: string;
    messageId: string;
}

interface IDeleteRoomMessageResponse {
    state: 'success';
}

const deleteRoomMessage = async ({ roomId, messageId }: IDeleteRoomMessage) => {
    const { data }: InData<IDeleteRoomMessageResponse> = await axios.delete(
        `chat/rooms/${roomId}/messages/${messageId}`,
    );

    return data;
};

export default deleteRoomMessage;
