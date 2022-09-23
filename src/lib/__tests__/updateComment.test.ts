import updateComment from '../updateComment';

test('should call endpoint with correct arguments', async () => {
    const commentId = '1';
    const content = 'comment content';

    const response = await updateComment({ commentId, content });

    expect(response).toMatchObject({
        _id: commentId,
        content,
    });
});
