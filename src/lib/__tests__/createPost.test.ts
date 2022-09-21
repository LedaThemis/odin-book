import axios from '../axiosInstance';
import createPost, { ICreatePost } from '../createPost';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: ICreatePost) => ({
        data: {
            post: data,
        },
    }),
}));

test('should create post', async () => {
    const postData = {
        content: 'Post Content',
        photos: [],
    };

    const spy = jest.spyOn(axios, 'post');

    const response = await createPost(postData);

    expect(response).toEqual<ICreatePost>(postData);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('posts', postData);
});
