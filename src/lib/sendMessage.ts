import axios from './axiosInstance';
import { IMessage } from './interfaces/Message';
import { InData } from './interfaces/Response';

interface ISendMessage {
    roomId: string;
    content: string;
    attachments: string[];
}

interface ISendMessageResponse {
    state: 'sucesss';
    message: IMessage;
}

const sendMessage = async ({ roomId, content, attachments }: ISendMessage) => {
    const { data }: InData<ISendMessageResponse> = await axios.post(
        `chat/rooms/${roomId}/messages`,
        {
            content,
            attachments,
        },
    );

    return data.message;
};

export default sendMessage;
