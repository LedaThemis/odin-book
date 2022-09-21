import axios from '../axiosInstance';
import startConversation from '../startConversation';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            room: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const userId = '1';

    const spy = jest.spyOn(axios, 'post');

    await startConversation({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('chat/conversations', {
        userId,
    });
});
