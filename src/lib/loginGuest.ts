import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';

interface ILoginGuest {
    userId: string;
}

interface ILoginGuestSuccessResponse {
    state: 'success';
}

type ILoginGuestResponse = ILoginGuestSuccessResponse | ErrorResponse;

const loginGuest = async ({
    userId,
}: ILoginGuest): Promise<ILoginGuestResponse> => {
    try {
        const { data } = await axios.post('guests', { id: userId });

        return data;
    } catch (err) {
        return handleError(err);
    }
};

export default loginGuest;
