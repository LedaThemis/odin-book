import axios from '../axiosInstance';
import updatePost from '../updatePost';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            post: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const postId = '1';
    const content = 'comment content';
    const photos = [''];

    const spy = jest.spyOn(axios, 'post');

    await updatePost({ postId, content, photos });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`posts/${postId}`, {
        content,
        photos,
    });
});
