import axios from '../axiosInstance';
import getUserPosts from '../getUserPosts';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            posts: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const userId = '1';
    const spy = jest.spyOn(axios, 'get');

    await getUserPosts({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/${userId}/posts`);
});
