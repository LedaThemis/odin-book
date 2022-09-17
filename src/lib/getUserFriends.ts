import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetUserFriends {
    userId: string;
}

interface IGetUserFriendsResponse {
    state: 'success';
    users: IUser[];
}

const getUserFriends = async ({
    userId,
}: IGetUserFriends): Promise<IUser[]> => {
    const { data }: InData<IGetUserFriendsResponse> = await axios.get(
        `users/${userId}/friends`,
    );

    return data.users;
};

export default getUserFriends;
