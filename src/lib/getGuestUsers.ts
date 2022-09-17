import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetGuestUsersResponse {
    state: 'success';
    users: IUser[];
}

const getGuestUsers = async (): Promise<IUser[]> => {
    const { data }: InData<IGetGuestUsersResponse> = await axios.get('/guests');

    return data.users;
};

export default getGuestUsers;
