import { IUser } from './User';

export interface IChatRoom {
    _id: string;
    members: IUser[];
    messages: string[];
    createdAt: string;
    updatedAt: string;
}
