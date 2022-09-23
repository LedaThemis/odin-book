import createPostComment from '../createPostComment';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';
    const content = 'Comment Content';

    const response = await createPostComment({ postId, content });

    expect(response).toMatchObject({
        _id: postId,
        comments: [
            {
                content,
            },
        ],
    });
});
