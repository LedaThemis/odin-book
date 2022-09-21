import axios from '../axiosInstance';
import createPostComment from '../createPostComment';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            post: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const postId = '1';
    const content = 'Comment Content';

    const spy = jest.spyOn(axios, 'post');

    await createPostComment({ postId, content });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}/comments`, { content });
});
