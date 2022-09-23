import deleteRoomMessage from '../deleteRoomMessage';

test('should call endpoint with correct arguments', async () => {
    const roomId = '1';
    const messageId = '1';

    const response = await deleteRoomMessage({ roomId, messageId });

    expect(response).toEqual({
        state: 'success',
    });
});
