import axios from './axiosInstance';
import { IPost } from './interfaces/Post';
import { InData } from './interfaces/Response';

interface IGetTimelineResponse {
    state: 'success';
    posts: IPost[];
}

const getTimeline = async (): Promise<IPost[]> => {
    const { data }: InData<IGetTimelineResponse> = await axios.get('timeline');

    return data.posts;
};

export default getTimeline;
