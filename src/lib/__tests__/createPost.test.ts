import createPost from '../createPost';

test('should call posts endpoint with correct arguments', async () => {
    const postData = {
        content: 'Post Content',
        photos: [],
    };

    const response = await createPost(postData);

    expect(response).toMatchObject(postData);
});
