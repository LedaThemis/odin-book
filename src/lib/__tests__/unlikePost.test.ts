import unlikePost from '../unlikePost';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';

    const response = await unlikePost({ postId });

    expect(response).toMatchObject({
        _id: postId,
    });
});
