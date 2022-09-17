import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IPopulatedUser } from './interfaces/User';

interface IGetUser {
    userId: string;
}

interface IGetUserResponse {
    state: 'success';
    user: IPopulatedUser;
}

const getUser = async ({ userId }: IGetUser): Promise<IPopulatedUser> => {
    const { data }: InData<IGetUserResponse> = await axios.get(
        `users/${userId}`,
    );

    return data.user;
};

export default getUser;
