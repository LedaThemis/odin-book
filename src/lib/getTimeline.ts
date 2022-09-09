import axios from './axiosInstance';
import handleError from './handleError';
import { ErrorResponse } from './interfaces/Error';
import { IPost } from './interfaces/Post';

interface IGetTimelineSuccessReponse {
    state: 'success';
    posts: IPost[];
}

type IGetTimelineReponse = IGetTimelineSuccessReponse | ErrorResponse;

const getTimeline = async (): Promise<IGetTimelineReponse> => {
    try {
        const { data } = await axios.get('timeline');

        return data;
    } catch (e) {
        return handleError(e);
    }
};

export default getTimeline;
