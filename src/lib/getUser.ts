import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPopulatedUser } from './interfaces/User';

interface IGetUser {
    userId: string;
}

interface IGetUserSuccessResponse {
    state: 'success';
    user: IPopulatedUser;
}

type IGetUserResponse = IGetUserSuccessResponse | ErrorResponse;

const getUser = async ({ userId }: IGetUser): Promise<IGetUserResponse> => {
    try {
        const { data } = await axios.get(`users/${userId}`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default getUser;
