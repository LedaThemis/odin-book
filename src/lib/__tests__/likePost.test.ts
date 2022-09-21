import axios from '../axiosInstance';
import likePost from '../likePost';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            post: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const postId = '1';
    const spy = jest.spyOn(axios, 'post');

    await likePost({ postId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}/like`);
});
