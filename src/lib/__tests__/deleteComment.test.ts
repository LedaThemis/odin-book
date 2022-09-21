import axios from '../axiosInstance';
import deleteComment from '../deleteComment';

jest.mock('../axiosInstance', () => ({
    delete: (route: string, data: unknown) => {
        return {
            data: {
                post: data,
            },
        };
    },
}));

test('should call axios delete with correct arguments', async () => {
    const postId = '1';
    const commentId = '1';

    const spy = jest.spyOn(axios, 'delete');

    await deleteComment({ postId, commentId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}/comments/${commentId}`);
});
