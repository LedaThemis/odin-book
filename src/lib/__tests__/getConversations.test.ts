import getConversations from '../getConversations';

test('should call endpoint with correct arguments', async () => {
    const response = await getConversations();

    expect(response).toStrictEqual([]);
});
