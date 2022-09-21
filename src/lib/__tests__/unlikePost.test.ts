import axios from '../axiosInstance';
import unlikePost from '../unlikePost';

jest.mock('../axiosInstance', () => ({
    delete: (route: string, data: unknown) => ({
        data: {
            post: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const postId = '1';

    const spy = jest.spyOn(axios, 'delete');

    await unlikePost({ postId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}/like`);
});
