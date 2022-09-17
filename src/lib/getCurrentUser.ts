import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetCurrentUserResponse {
    user?: IUser;
}

const getCurrentUser = async (): Promise<IUser | null> => {
    const { data }: InData<IGetCurrentUserResponse> = await axios.get('me');

    if (!data.user) {
        return null;
    }

    return data.user;
};

export default getCurrentUser;
