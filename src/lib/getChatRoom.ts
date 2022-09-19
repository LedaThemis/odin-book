import axios from './axiosInstance';
import { IChatRoom } from './interfaces/ChatRoom';
import { InData } from './interfaces/Response';

interface IGetChatRoom {
    roomId: string;
}

interface IGetChatRoomResponse {
    state: 'success';
    room: IChatRoom;
}

const getChatRoom = async ({ roomId }: IGetChatRoom) => {
    const { data }: InData<IGetChatRoomResponse> = await axios.get(
        `chat/rooms/${roomId}`,
    );

    return data.room;
};

export default getChatRoom;
