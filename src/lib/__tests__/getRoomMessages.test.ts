import getRoomMessages from '../getRoomMessages';

test('should call endpoint with correct arguments', async () => {
    const roomId = '1';

    const response = await getRoomMessages({ roomId });

    expect(response).toStrictEqual([]);
});
