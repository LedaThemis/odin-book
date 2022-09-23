import getUser from '../getUser';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await getUser({ userId });

    expect(response).toMatchObject({
        _id: userId,
    });
});
