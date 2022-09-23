import friendUser from '../friendUser';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await friendUser({ userId });

    expect(response).toMatchObject({
        _id: userId,
    });
});
