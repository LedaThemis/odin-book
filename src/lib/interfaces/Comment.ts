import { IUser } from './User';

export interface IComment {
    content: string;
    author: IUser;
    createdAt: string;
    updatedAt: string;
}
