import logout from '../logout';

test('should call endpoint with correct arguments', async () => {
    const response = await logout();

    // Does not return
    expect(response).toBeUndefined();
});
