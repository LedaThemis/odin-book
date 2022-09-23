import getUserPosts from '../getUserPosts';

test('should call axios get with correct arguments', async () => {
    const userId = '1';

    const response = await getUserPosts({ userId });

    expect(response).toStrictEqual([]);
});
