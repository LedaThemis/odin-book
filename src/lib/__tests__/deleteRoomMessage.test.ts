import axios from '../axiosInstance';
import deleteRoomMessage from '../deleteRoomMessage';

jest.mock('../axiosInstance', () => ({
    delete: (route: string, data: unknown) => ({
        data,
    }),
}));

test('should call axios delete with correct arguments', async () => {
    const roomId = '1';
    const messageId = '1';

    const spy = jest.spyOn(axios, 'delete');

    await deleteRoomMessage({ roomId, messageId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
        `chat/rooms/${roomId}/messages/${messageId}`,
    );
});
