import axios from '../axiosInstance';
import deletePost from '../deletePost';

jest.mock('../axiosInstance', () => ({
    delete: (route: string, data: unknown) => ({
        data: {
            postId: data,
        },
    }),
}));

test('should call axios delete with correct arguments', async () => {
    const postId = '1';

    const spy = jest.spyOn(axios, 'delete');

    await deletePost({ postId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}`);
});
