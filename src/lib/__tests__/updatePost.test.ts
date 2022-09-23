import updatePost from '../updatePost';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';
    const content = 'comment content';
    const photos = [''];

    const response = await updatePost({ postId, content, photos });

    expect(response).toMatchObject({
        _id: postId,
        content,
        photos,
    });
});
