import axios from '../axiosInstance';
import getConversations from '../getConversations';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            room: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getConversations();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('chat/conversations');
});
