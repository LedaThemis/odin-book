import axios from './axiosInstance';
import { InData } from './interfaces/Response';

interface IDeletePost {
    postId: string;
}

interface IDeletePostResponse {
    state: 'success';
    postId: string;
}

const deletePost = async ({ postId }: IDeletePost) => {
    const { data }: InData<IDeletePostResponse> = await axios.delete(
        `posts/${postId}`,
    );

    return data.postId;
};

export default deletePost;
