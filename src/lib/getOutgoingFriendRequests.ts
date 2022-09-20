import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetUserOutgoingFriendRequestsResponse {
    state: 'success';
    users: IUser[];
}

const getUserOutgoingFriendRequests = async () => {
    const { data }: InData<IGetUserOutgoingFriendRequestsResponse> =
        await axios.get('outgoing');

    return data.users;
};

export default getUserOutgoingFriendRequests;
