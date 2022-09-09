import axios from './axiosInstance';
import handleError from './handleError';
import { IUser } from './interfaces/User';

interface IResponse {
    user?: IUser;
}

const getCurrentUser = async (): Promise<IResponse> => {
    try {
        const { data }: { data: IResponse } = await axios.get('me', {
            withCredentials: true,
        });

        return data;
    } catch (err) {
        console.error(handleError(err));

        return {};
    }
};

export default getCurrentUser;
