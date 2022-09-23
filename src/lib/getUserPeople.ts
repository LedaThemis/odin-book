import axios from './axiosInstance';
import { InData } from './interfaces/Response';
import { IUser } from './interfaces/User';

interface IGetUserPeople {
    pageParam?: string;
}

interface IGetUserPeopleResponse {
    state: 'success';
    users: IUser[];
    nextCursor?: string;
}

/**
 * Get people user might know
 */
const getUserPeople = async ({ pageParam = '' }: IGetUserPeople) => {
    const { data }: InData<IGetUserPeopleResponse> = await axios.get(
        `people?cursor=${pageParam}`,
    );

    return data;
};

export default getUserPeople;
