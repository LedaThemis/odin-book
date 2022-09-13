import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IUser } from './interfaces/User';

interface IGetUserPeopleSuccessResponse {
    state: 'success';
    users: IUser[];
}

type IGetUserPeopleResponse = IGetUserPeopleSuccessResponse | ErrorResponse;

/**
 * Get people user might know
 * @returns List of users
 */
const getUserPeople = async (): Promise<IGetUserPeopleResponse> => {
    try {
        const { data } = await axios.get(`people`);

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default getUserPeople;
