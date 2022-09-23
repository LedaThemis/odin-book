import sendMessage from '../sendMessage';

test('should call endpoint with correct arguments', async () => {
    const roomId = '1';
    const content = 'message content';
    const attachments = [''];

    const response = await sendMessage({ roomId, content, attachments });

    expect(response).toMatchObject({
        content,
        attachments,
    });
});
