import queryUsers from '../queryUsers';

test('should call endpoint with correct arguments', async () => {
    const queryString = '1';

    const response = await queryUsers({ q: queryString });

    expect(response).toStrictEqual([]);
});
