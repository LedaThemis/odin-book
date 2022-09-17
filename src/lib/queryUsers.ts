import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IQueryUsers {
    q: string;
}

interface IQueryUsersResponse {
    state: 'success';
    users: IUser[];
}

const queryUsers = async ({ q }: IQueryUsers): Promise<IUser[]> => {
    const options = { q };
    const params = new URLSearchParams(options);

    const { data }: InData<IQueryUsersResponse> = await axios.get(
        'users/search?' + params.toString(),
    );

    return data.users;
};

export default queryUsers;
