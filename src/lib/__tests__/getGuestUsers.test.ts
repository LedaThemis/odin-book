import getGuestUsers from '../getGuestUsers';

test('should call endpoint with correct arguments', async () => {
    const response = await getGuestUsers();

    expect(response).toStrictEqual([]);
});
