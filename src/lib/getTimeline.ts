import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IGetTimeline {
    pageParam?: string;
}

interface IGetTimelineResponse {
    state: 'success';
    posts: IPost[];
    nextCursor?: string;
}

const getTimeline = async ({ pageParam = '' }: IGetTimeline) => {
    const { data }: InData<IGetTimelineResponse> = await axios.get(
        `timeline?cursor=${pageParam}`,
    );

    return data;
};

export default getTimeline;
