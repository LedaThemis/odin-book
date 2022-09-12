import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IQueryUsers {
    q: string;
}

interface IQueryUsersSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IQueryUsersResponse = IQueryUsersSuccessResponse | ErrorResponse;

const queryUsers = async ({ q }: IQueryUsers): Promise<IQueryUsersResponse> => {
    try {
        const options = { q };
        const params = new URLSearchParams(options);

        const { data } = await axios.get('users/search?' + params.toString());

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default queryUsers;
