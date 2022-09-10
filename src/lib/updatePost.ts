import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface IUpdatePost {
    postId: string;
    content: string;
    photos: string[];
}

interface IUpdatePostSuccessResponse {
    state: 'success';
    post: IPost;
}

export type IUpdatePostResponse = IUpdatePostSuccessResponse | ErrorResponse;

const updatePost = async ({
    postId,
    content,
    photos,
}: IUpdatePost): Promise<IUpdatePostResponse> => {
    try {
        const { data } = await axios.post(`posts/${postId}`, {
            content,
            photos,
        });

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default updatePost;
