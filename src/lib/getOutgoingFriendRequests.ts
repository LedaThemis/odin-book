import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IGetUserOutgoingFriendRequestsSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IGetUserOutgoingFriendRequestsResponse =
    | IGetUserOutgoingFriendRequestsSuccessResponse
    | ErrorResponse;

const getUserOutgoingFriendRequests =
    async (): Promise<IGetUserOutgoingFriendRequestsResponse> => {
        try {
            const { data } = await axios.get('outgoing');

            return data;
        } catch (err) {
            return handleError(err);
        }
    };

export default getUserOutgoingFriendRequests;
