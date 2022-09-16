import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IGetGuestUsersSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IGetGuestUsersResponse = IGetGuestUsersSuccessResponse | ErrorResponse;

const getGuestUsers = async (): Promise<IGetGuestUsersResponse> => {
    try {
        const { data } = await axios.get('/guests');

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default getGuestUsers;
