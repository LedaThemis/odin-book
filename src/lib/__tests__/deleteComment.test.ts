import deleteComment from '../deleteComment';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';
    const commentId = '1';

    const response = await deleteComment({ postId, commentId });

    expect(response).toMatchObject({
        _id: postId,
    });
});
