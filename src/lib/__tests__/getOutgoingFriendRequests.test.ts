import axios from '../axiosInstance';
import getUserOutgoingFriendRequests from '../getOutgoingFriendRequests';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getUserOutgoingFriendRequests();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('outgoing');
});
