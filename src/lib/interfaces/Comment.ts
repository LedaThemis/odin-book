import { IUser } from './User';

export interface IComment {
    _id: string;
    content: string;
    author: IUser;
    createdAt: string;
    updatedAt: string;
}
