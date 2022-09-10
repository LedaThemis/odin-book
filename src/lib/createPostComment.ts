import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface ICreatePostComment {
    postId: string;
    content: string;
}

interface ICreatePostCommentSuccessResponse {
    state: 'success';
    post: IPost;
}

type ICreatePostCommentResponse =
    | ICreatePostCommentSuccessResponse
    | ErrorResponse;

const createPostComment = async ({
    postId,
    content,
}: ICreatePostComment): Promise<ICreatePostCommentResponse> => {
    try {
        const { data } = await axios.post(`posts/${postId}/comments`, {
            content,
        });

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default createPostComment;
