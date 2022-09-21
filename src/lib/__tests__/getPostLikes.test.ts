import axios from '../axiosInstance';
import getPostLikes from '../getPostLikes';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const postId = '1';
    const spy = jest.spyOn(axios, 'get');

    await getPostLikes({ postId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}/likes`);
});
