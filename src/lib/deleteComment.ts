import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface IDeleteComment {
    postId: string;
    commentId: string;
}

interface IDeleteCommentSuccessResponse {
    state: 'success';
    post: IPost;
}

export type IDeleteCommentResponse =
    | IDeleteCommentSuccessResponse
    | ErrorResponse;

const deleteComment = async ({
    postId,
    commentId,
}: IDeleteComment): Promise<IDeleteCommentResponse> => {
    try {
        const { data } = await axios.delete(
            `posts/${postId}/comments/${commentId}`,
        );

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default deleteComment;
