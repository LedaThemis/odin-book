import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

export interface ICreatePost {
    content: string;
    photos: string[];
}

interface ICreatePostResponse {
    state: 'success';
    post: IPost;
}

const createPost = async ({ content, photos }: ICreatePost) => {
    const { data }: InData<ICreatePostResponse> = await axios.post('posts', {
        content,
        photos,
    });

    return data.post;
};

export default createPost;
