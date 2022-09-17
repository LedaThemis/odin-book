import axios from './axiosInstance';
import { IComment } from './interfaces/Comment';
import { InData } from './interfaces/Response';

interface IUpdateComment {
    commentId: string;
    content: string;
}

interface IUpdateCommentResponse {
    state: 'success';
    comment: IComment;
}

const updateComment = async ({
    commentId,
    content,
}: IUpdateComment): Promise<IComment> => {
    const { data }: InData<IUpdateCommentResponse> = await axios.post(
        `comments/${commentId}`,
        {
            content,
        },
    );

    return data.comment;
};

export default updateComment;
