import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPopulatedUser } from './interfaces/User';

interface IFriendUser {
    userId: string;
}

interface IUnFriendUserSuccessResponse {
    state: 'success';
    user: IPopulatedUser;
}

type IUnFriendUserResponse = IUnFriendUserSuccessResponse | ErrorResponse;

const unfriendUser = async ({
    userId,
}: IFriendUser): Promise<IUnFriendUserResponse> => {
    try {
        const { data } = await axios.delete(`users/${userId}/friend`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default unfriendUser;
