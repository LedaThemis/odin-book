import getTimeline from '../getTimeline';

test('should call endpoint with correct arguments if pageParam is not specified', async () => {
    const response = await getTimeline({});

    expect(response).toMatchObject({
        posts: [],
        nextCursor: '',
    });
});

test('should call endpoint with correct arguments if pageParam is specified', async () => {
    const pageParam = '1';

    const response = await getTimeline({ pageParam });

    expect(response).toMatchObject({
        posts: [],
        nextCursor: pageParam,
    });
});
