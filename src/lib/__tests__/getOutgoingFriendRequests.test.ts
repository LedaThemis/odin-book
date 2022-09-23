import getUserOutgoingFriendRequests from '../getOutgoingFriendRequests';

test('should call endpoint with correct arguments', async () => {
    const response = await getUserOutgoingFriendRequests();

    expect(response).toStrictEqual([]);
});
