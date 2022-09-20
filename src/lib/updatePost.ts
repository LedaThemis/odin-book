import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IUpdatePost {
    postId: string;
    content: string;
    photos: string[];
}

interface IUpdatePostResponse {
    state: 'success';
    post: IPost;
}

const updatePost = async ({ postId, content, photos }: IUpdatePost) => {
    const { data }: InData<IUpdatePostResponse> = await axios.post(
        `posts/${postId}`,
        {
            content,
            photos,
        },
    );

    return data.post;
};

export default updatePost;
