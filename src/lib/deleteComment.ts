import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IDeleteComment {
    postId: string;
    commentId: string;
}

interface IDeleteCommentResponse {
    state: 'success';
    post: IPost;
}

const deleteComment = async ({ postId, commentId }: IDeleteComment) => {
    const { data }: InData<IDeleteCommentResponse> = await axios.delete(
        `posts/${postId}/comments/${commentId}`,
    );

    return data.post;
};

export default deleteComment;
