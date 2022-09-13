import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IUpdateUser {
    photoURL: string;
}

interface IUpdateUserSuccessResponse {
    state: 'success';
    user: IUser;
}

export type IUpdateUserResponse = IUpdateUserSuccessResponse | ErrorResponse;

const updateUser = async ({
    photoURL,
}: IUpdateUser): Promise<IUpdateUserResponse> => {
    try {
        const { data } = await axios.post(`me`, {
            photoURL,
        });

        return data;
    } catch (e: unknown) {
        return handleError(e);
    }
};

export default updateUser;
