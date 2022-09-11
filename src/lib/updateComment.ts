import axios from './axiosInstance';
import handleError from './handleError';
import { IComment } from './interfaces/Comment';
import { ErrorResponse } from './interfaces/Error';

interface IUpdateComment {
    commentId: string;
    content: string;
}

interface IUpdateCommentSuccessResponse {
    state: 'success';
    comment: IComment;
}

export type IUpdateCommentResponse =
    | IUpdateCommentSuccessResponse
    | ErrorResponse;

const updateComment = async ({
    commentId,
    content,
}: IUpdateComment): Promise<IUpdateCommentResponse> => {
    try {
        const { data } = await axios.post(`comments/${commentId}`, {
            content,
        });

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default updateComment;
