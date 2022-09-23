import getUserIncomingFriendRequests from '../getIncomingFriendRequests';

test('should call endpoint with correct arguments', async () => {
    const response = await getUserIncomingFriendRequests();

    expect(response).toStrictEqual([]);
});
