import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface ILikePost {
    postId: string;
}

interface ILikePostSuccessResponse {
    state: 'success';
    post: IPost;
}

type LikePostResponse = ILikePostSuccessResponse | ErrorResponse;

const likePost = async ({ postId }: ILikePost): Promise<LikePostResponse> => {
    try {
        const { data } = await axios.post(`posts/${postId}/like`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default likePost;
