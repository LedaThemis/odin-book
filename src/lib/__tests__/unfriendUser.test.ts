import unfriendUser from '../unfriendUser';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await unfriendUser({ userId });

    // User ID should not be in friends
    expect(response).not.toMatchObject({
        friends: [{ _id: userId }],
    });
});
