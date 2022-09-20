import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface ILikePost {
    postId: string;
}

interface ILikePostResponse {
    state: 'success';
    post: IPost;
}

const likePost = async ({ postId }: ILikePost) => {
    const { data }: InData<ILikePostResponse> = await axios.post(
        `posts/${postId}/like`,
    );

    return data.post;
};

export default likePost;
