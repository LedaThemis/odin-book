import getChatRoom from '../getChatRoom';

test('should call endpoint with correct arguments', async () => {
    const roomId = '1';

    const response = await getChatRoom({ roomId });

    expect(response).toMatchObject({
        _id: roomId,
    });
});
