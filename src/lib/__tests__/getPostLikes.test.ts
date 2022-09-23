import getPostLikes from '../getPostLikes';

test('should call endpoint with correct arguments', async () => {
    const postId = '1';

    const response = await getPostLikes({ postId });

    expect(response).toStrictEqual([]);
});
