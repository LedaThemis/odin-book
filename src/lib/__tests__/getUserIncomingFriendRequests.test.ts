import axios from '../axiosInstance';
import getUserIncomingFriendRequests from '../getUserIncomingFriendRequests';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getUserIncomingFriendRequests();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('incoming');
});
