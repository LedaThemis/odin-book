import axios from '../axiosInstance';
import getChatRoom from '../getChatRoom';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            room: data,
        },
    }),
}));

test('should call axios delete with correct arguments', async () => {
    const roomId = '1';

    const spy = jest.spyOn(axios, 'get');

    await getChatRoom({ roomId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`chat/rooms/${roomId}`);
});
