import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';

interface IDeletePost {
    postId: string;
}

interface IDeletePostSuccessResponse {
    state: 'success';
    postId: string;
}

export type IDeletePostResponse = ErrorResponse | IDeletePostSuccessResponse;

const deletePost = async ({
    postId,
}: IDeletePost): Promise<IDeletePostResponse> => {
    try {
        const { data } = await axios.delete(`posts/${postId}`);

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default deletePost;
