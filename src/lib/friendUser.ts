import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPopulatedUser } from './interfaces/User';

interface IFriendUser {
    userId: string;
}

interface IFriendUserSuccessResponse {
    state: 'success';
    user: IPopulatedUser;
}

type IFriendUserResponse = IFriendUserSuccessResponse | ErrorResponse;

const friendUser = async ({
    userId,
}: IFriendUser): Promise<IFriendUserResponse> => {
    try {
        const { data } = await axios.post(`users/${userId}/friend`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default friendUser;
