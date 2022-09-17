import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IUpdateUser {
    photoURL: string;
}

interface IUpdateUserResponse {
    state: 'success';
    user: IUser;
}

const updateUser = async ({ photoURL }: IUpdateUser): Promise<IUser> => {
    const { data }: InData<IUpdateUserResponse> = await axios.post(`me`, {
        photoURL,
    });

    return data.user;
};

export default updateUser;
