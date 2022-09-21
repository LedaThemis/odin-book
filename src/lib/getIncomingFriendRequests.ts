import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetUserIncomingFriendRequestsResponse {
    state: 'success';
    users: IUser[];
}

const getUserIncomingFriendRequests = async (): Promise<IUser[]> => {
    const { data }: InData<IGetUserIncomingFriendRequestsResponse> =
        await axios.get('incoming');

    return data.users;
};

export default getUserIncomingFriendRequests;
