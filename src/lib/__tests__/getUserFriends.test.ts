import getUserFriends from '../getUserFriends';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await getUserFriends({ userId });

    expect(response).toStrictEqual([]);
});
