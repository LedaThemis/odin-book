import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IPopulatedUser } from './interfaces/User';

interface IFriendUser {
    userId: string;
}

interface IFriendUserResponse {
    state: 'success';
    user: IPopulatedUser;
}

const friendUser = async ({ userId }: IFriendUser): Promise<IPopulatedUser> => {
    const { data }: InData<IFriendUserResponse> = await axios.post(
        `users/${userId}/friend`,
    );

    return data.user;
};

export default friendUser;
