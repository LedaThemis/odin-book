import axios from '../axiosInstance';
import updateComment from '../updateComment';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            comment: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const commentId = '1';
    const content = 'comment content';

    const spy = jest.spyOn(axios, 'post');

    await updateComment({ commentId, content });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`comments/${commentId}`, {
        content,
    });
});
