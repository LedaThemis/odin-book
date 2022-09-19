import { IMessage } from './Message';
import { IUser } from './User';

export interface IBaseChatRoom {
    _id: string;
    members: IUser[];
    createdAt: string;
    updatedAt: string;
}

export interface IChatRoom extends IBaseChatRoom {
    messages: string[];
}


export interface IPopulatedChatRoom extends IBaseChatRoom {
    messages: IMessage[];
}