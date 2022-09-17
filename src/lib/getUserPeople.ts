import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetUserPeopleResponse {
    state: 'success';
    users: IUser[];
}

/**
 * Get people user might know
 * @returns List of users
 */
const getUserPeople = async (): Promise<IUser[]> => {
    const { data }: InData<IGetUserPeopleResponse> = await axios.get(`people`);

    return data.users;
};

export default getUserPeople;
