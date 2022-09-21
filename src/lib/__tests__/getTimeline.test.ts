import axios from '../axiosInstance';
import getTimeline from '../getTimeline';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            posts: data,
        },
    }),
}));

afterEach(() => {
    // resetting jest.spyOn
    jest.restoreAllMocks();
});

test('should call axios get with correct arguments if pageParam is not specified', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getTimeline({});

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('timeline?cursor=');
});

test('should call axios get with correct arguments if pageParam is specified', async () => {
    const pageParam = '1';
    const spy = jest.spyOn(axios, 'get');

    await getTimeline({ pageParam });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`timeline?cursor=${pageParam}`);
});
