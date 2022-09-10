import { IComment } from './Comment';
import { IUser } from './User';

export interface IPost {
    _id: string;
    content: string;
    photos: string[];
    author: IUser;
    comments: IComment[];
    likes: string[];
    createdAt: string;
    updatedAt: string;
}
