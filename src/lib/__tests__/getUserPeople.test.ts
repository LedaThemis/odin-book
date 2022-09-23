import getUserPeople from '../getUserPeople';

test('should call endpoint with correct arguments if pageParam is not specified', async () => {
    const response = await getUserPeople({});

    expect(response).toMatchObject({
        users: [],
        nextCursor: '',
    });
});

test('should call endpoint with correct arguments if pageParam is specified', async () => {
    const pageParam = '1';

    const response = await getUserPeople({ pageParam });

    expect(response).toMatchObject({
        users: [],
        nextCursor: pageParam,
    });
});
