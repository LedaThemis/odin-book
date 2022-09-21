import axios from '../axiosInstance';
import sendMessage from '../sendMessage';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            message: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const roomId = '1';
    const content = 'message content';
    const attachments = [''];

    const spy = jest.spyOn(axios, 'post');

    await sendMessage({ roomId, content, attachments });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`chat/rooms/${roomId}/messages`, {
        content,
        attachments,
    });
});
