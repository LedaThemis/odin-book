import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';

interface IPost {
    _id: string;
    content: string;
    photos: string[];
    author: string;
    comments: string[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface ICreatePost {
    content: string;
    photos: string[];
}

interface ICreatePostSuccessResponse {
    state: 'success';
    post: IPost;
}

type ICreatePostResponse = ErrorResponse | ICreatePostSuccessResponse;

const createPost = async ({
    content,
    photos,
}: ICreatePost): Promise<ICreatePostResponse> => {
    try {
        const { data }: { data: ICreatePostResponse } = await axios.post(
            'posts',
            { content, photos },
            { withCredentials: true },
        );

        return data;
    } catch (e: any) {
        return handleError(e);
    }
};

export default createPost;
