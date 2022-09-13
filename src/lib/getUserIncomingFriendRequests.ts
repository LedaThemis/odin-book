import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IGetUserIncomingFriendRequestsSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IGetUserIncomingFriendRequestsResponse =
    | IGetUserIncomingFriendRequestsSuccessResponse
    | ErrorResponse;

const getUserIncomingFriendRequests =
    async (): Promise<IGetUserIncomingFriendRequestsResponse> => {
        try {
            const { data } = await axios.get('incoming');

            return data;
        } catch (err) {
            return handleError(err);
        }
    };

export default getUserIncomingFriendRequests;
