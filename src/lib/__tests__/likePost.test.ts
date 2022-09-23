import likePost from '../likePost';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';

    const response = await likePost({ postId });

    expect(response).toMatchObject({
        _id: postId,
    });
});
