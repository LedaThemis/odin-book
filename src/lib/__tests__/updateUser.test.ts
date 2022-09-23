import updateUser from '../updateUser';

test('should call endpoint with correct arguments', async () => {
    const photoURL = 'new photo url';

    const response = await updateUser({ photoURL });

    expect(response).toMatchObject({
        custom: {
            photoURL,
        },
    });
});
