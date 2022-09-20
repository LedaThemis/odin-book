import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetPostLikes {
    postId: string;
}

interface IGetPostLikesResponse {
    state: 'success';
    users: IUser[];
}

const getPostLikes = async ({ postId }: IGetPostLikes) => {
    const { data }: InData<IGetPostLikesResponse> = await axios.get(
        `posts/${postId}/likes`,
    );

    return data.users;
};
export default getPostLikes;
