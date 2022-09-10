import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface ICreatePost {
    content: string;
    photos: string[];
}

interface ICreatePostSuccessResponse {
    state: 'success';
    post: IPost;
}

export type ICreatePostResponse = ErrorResponse | ICreatePostSuccessResponse;

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
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default createPost;
