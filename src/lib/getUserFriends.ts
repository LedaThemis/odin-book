import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IGetUserFriends {
    userId: string;
}

interface IGetUserFriendsSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IGetUserFriendsResponse = IGetUserFriendsSuccessResponse | ErrorResponse;

const getUserFriends = async ({
    userId,
}: IGetUserFriends): Promise<IGetUserFriendsResponse> => {
    try {
        const { data } = await axios.get(`users/${userId}/friends`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default getUserFriends;
