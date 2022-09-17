import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IGetUserPosts {
    userId: string;
}

interface IGetUserPostsResponse {
    state: 'success';
    posts: IPost[];
}

const getUserPosts = async ({ userId }: IGetUserPosts): Promise<IPost[]> => {
    const { data }: InData<IGetUserPostsResponse> = await axios.get(
        `users/${userId}/posts`,
    );

    return data.posts;
};

export default getUserPosts;
