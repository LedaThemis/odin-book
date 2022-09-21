import axios from '../axiosInstance';
import getRoomMessages from '../getRoomMessages';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            messages: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const roomId = '1';
    const spy = jest.spyOn(axios, 'get');

    await getRoomMessages({ roomId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`chat/rooms/${roomId}/messages`);
});
