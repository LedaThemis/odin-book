import deletePost from '../deletePost';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';

    const response = await deletePost({ postId });

    expect(response).toBe(postId);
});
