import { IUser } from './User';

export interface IPost {
    _id: string;
    content: string;
    photos: string[];
    author: IUser;
    comments: string[];
    likes: string[];
    createdAt: string;
    updatedAt: string;
}
