import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IPopulatedUser } from './interfaces/User';

interface IFriendUser {
    userId: string;
}

interface IUnFriendUserResponse {
    state: 'success';
    user: IPopulatedUser;
}

const unfriendUser = async ({
    userId,
}: IFriendUser): Promise<IPopulatedUser> => {
    const { data }: InData<IUnFriendUserResponse> = await axios.delete(
        `users/${userId}/friend`,
    );

    return data.user;
};

export default unfriendUser;
