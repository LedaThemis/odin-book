import startConversation from '../startConversation';

test('should call endpoint with correct arguments', async () => {
    const userId = '1';

    const response = await startConversation({ userId });

    expect(response).toMatchObject({
        members: [
            {
                _id: userId,
            },
        ],
    });
});
