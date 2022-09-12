import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface IGetUserPosts {
    userId: string;
}

interface IGetUserPostsSuccessResponse {
    state: 'success';
    posts: IPost[];
}

type IGetUserPostsResponse = IGetUserPostsSuccessResponse | ErrorResponse;

const getUserPosts = async ({
    userId,
}: IGetUserPosts): Promise<IGetUserPostsResponse> => {
    try {
        const { data } = await axios.get(`users/${userId}/posts`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default getUserPosts;
