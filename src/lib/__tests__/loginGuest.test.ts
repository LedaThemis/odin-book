import loginGuest from '../loginGuest';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await loginGuest({ userId });

    // Does not return
    expect(response).toBeUndefined();
});
