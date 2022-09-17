import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetCurrentUserResponse {
    user?: IUser;
}

const getCurrentUser = async (): Promise<IUser | undefined> => {
    const { data }: InData<IGetCurrentUserResponse> = await axios.get('me');

    return data.user;
};

export default getCurrentUser;
