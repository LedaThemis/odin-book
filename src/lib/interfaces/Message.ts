import { IUser } from './User';

export interface IMessage {
    _id: string;
    author: IUser;
    content: string;
    attachments: string[];
}
