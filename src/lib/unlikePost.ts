import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface IUnLikePost {
    postId: string;
}

interface IUnLikePostSuccessResponse {
    state: 'success';
    post: IPost;
}

type UnLikePostResponse = IUnLikePostSuccessResponse | ErrorResponse;

const unlikePost = async ({
    postId,
}: IUnLikePost): Promise<UnLikePostResponse> => {
    try {
        const { data } = await axios.delete(`posts/${postId}/like`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default unlikePost;
