import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface ICreatePostComment {
    postId: string;
    content: string;
}

interface ICreatePostCommentResponse {
    state: 'success';
    post: IPost;
}

const createPostComment = async ({
    postId,
    content,
}: ICreatePostComment): Promise<IPost> => {
    const { data }: InData<ICreatePostCommentResponse> = await axios.post(
        `posts/${postId}/comments`,
        {
            content,
        },
    );

    return data.post;
};

export default createPostComment;
