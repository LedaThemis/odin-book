import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IUnLikePost {
    postId: string;
}

interface IUnLikePostResponse {
    state: 'success';
    post: IPost;
}

const unlikePost = async ({ postId }: IUnLikePost): Promise<IPost> => {
    const { data }: InData<IUnLikePostResponse> = await axios.delete(
        `posts/${postId}/like`,
    );

    return data.post;
};

export default unlikePost;
